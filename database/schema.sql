-- Enable Row Level Security
alter table auth.users enable row level security;

-- PROFILES TABLE
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  role text check (role in ('hr', 'employee')) default 'employee',
  employee_id text unique,
  salary_details jsonb,
  hourly_rate numeric default 0,
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

-- ATTENDANCE TABLE
create table public.attendance (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  date date not null default current_date,
  check_in timestamptz,
  check_out timestamptz,
  status text check (status in ('present', 'absent', 'half-day')) default 'present',
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.attendance enable row level security;

-- LEAVES TABLE
create table public.leaves (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  leave_type text check (leave_type in ('paid', 'sick', 'unpaid')),
  start_date date not null,
  end_date date not null,
  remarks text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.leaves enable row level security;

-- PAYROLL TABLE
create table public.payroll (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  total_hours numeric default 0,
  calculated_salary numeric default 0,
  status text check (status in ('draft', 'paid')) default 'draft',
  created_at timestamptz default now(),
  primary key (id)
);

alter table public.payroll enable row level security;

-- EMPLOYEE ID SEQUENCE TRACKING
create table public.employee_id_sequences (
  year integer primary key,
  last_serial integer not null default 0
);

alter table public.employee_id_sequences enable row level security;
-- HR can view sequences
create policy "HR can view sequences" on public.employee_id_sequences for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'hr'));

-- FUNCTION to get next serial number for a year
create or replace function public.get_next_employee_serial(year_val integer)
returns integer as $$
declare
  next_val integer;
begin
  insert into public.employee_id_sequences (year, last_serial)
  values (year_val, 1)
  on conflict (year) do update
  set last_serial = employee_id_sequences.last_serial + 1
  returning last_serial into next_val;
  
  return next_val;
end;
$$ language plpgsql security definer;

-- Profiles: 
-- Users can view their own profile.
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

-- Admins (HR) can view all profiles.
create policy "HR can view all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- HR can update profiles.
create policy "HR can update profiles" on public.profiles
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- Attendance:
-- Users can view their own attendance.
create policy "Users can view own attendance" on public.attendance
  for select using (auth.uid() = user_id);

-- HR can view all attendance.
create policy "HR can view all attendance" on public.attendance
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- Users can insert their own attendance (Check-in).
create policy "Users can insert own attendance" on public.attendance
  for insert with check (auth.uid() = user_id);

-- Users can update their own attendance (Check-out).
create policy "Users can update own attendance" on public.attendance
  for update using (auth.uid() = user_id);


-- Leaves:
-- Users can view own leaves.
create policy "Users can view own leaves" on public.leaves
  for select using (auth.uid() = user_id);

-- HR can view all leaves.
create policy "HR can view all leaves" on public.leaves
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- Users can insert own leaves.
create policy "Users can insert own leaves" on public.leaves
  for insert with check (auth.uid() = user_id);

-- HR can update leave status.
create policy "HR can update leaves" on public.leaves
  for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- Payroll:
-- Users can view own payroll.
create policy "Users can view own payroll" on public.payroll
  for select using (auth.uid() = user_id);

-- HR can manage payroll.
create policy "HR can manage payroll" on public.payroll
  for all using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'hr'
    )
  );

-- FUNCTIONS & TRIGGERS

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role, employee_id)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    coalesce(new.raw_user_meta_data->>'role', 'employee'),
    new.raw_user_meta_data->>'employee_id'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
