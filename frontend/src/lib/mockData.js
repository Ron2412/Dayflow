export const MOCK_USER = {
    id: 'user-001',
    email: 'employee@odooindia.com',
    full_name: 'John Doe',
    role: 'employee',
    employee_id: 'OIJODO2024001',
    hourly_rate: 25.0,
    department: 'Engineering',
    designation: 'Frontend Developer',
    join_date: '2024-01-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
};

export const MOCK_HR = {
    id: 'hr-001',
    email: 'hr@odooindia.com',
    full_name: 'Sarah Smith',
    role: 'hr',
    employee_id: 'OISASM2024001',
    hourly_rate: 45.0,
    department: 'Human Resources',
    designation: 'HR Manager',
    join_date: '2023-06-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
};

export const EMPLOYEES = [
    MOCK_HR,
    MOCK_USER,
    {
        id: 'user-002',
        full_name: 'Marcus Chen',
        email: 'marcus@odooindia.com',
        role: 'employee',
        employee_id: 'OIMACH2024002',
        department: 'Operations',
        designation: 'DevOps Engineer',
        status: 'active',
        join_date: '2024-02-10',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    },
    {
        id: 'user-003',
        full_name: 'Elena Rodriguez',
        email: 'elena@odooindia.com',
        role: 'employee',
        employee_id: 'OIELRO2024003',
        department: 'Product',
        designation: 'Product Manager',
        status: 'active',
        join_date: '2024-03-05',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
        id: 'user-004',
        full_name: 'David Kim',
        email: 'david@odooindia.com',
        role: 'employee',
        employee_id: 'OIDAKI2024004',
        department: 'Human Resources',
        designation: 'HR Specialist',
        status: 'active',
        join_date: '2024-01-20',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
        id: 'user-005',
        full_name: 'Sophie Laurent',
        email: 'sophie@odooindia.com',
        role: 'employee',
        employee_id: 'OISOLA2024005',
        department: 'Engineering',
        designation: 'Backend Developer',
        status: 'on-leave',
        join_date: '2023-11-12',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
    },
];

// Reference date for simulation: 2024-03-01
export const MOCK_ATTENDANCE = [
    { id: '1', user_id: 'user-001', date: '2024-03-01', check_in: '09:00 AM', check_out: '05:00 PM', status: 'on-time', location: 'Office' },
    { id: '2', user_id: 'user-002', date: '2024-03-01', check_in: '09:12 AM', check_out: '05:30 PM', status: 'late', location: 'Remote' },
    { id: '3', user_id: 'user-003', date: '2024-03-01', check_in: '08:45 AM', check_out: '04:45 PM', status: 'on-time', location: 'Office' },
    { id: '4', user_id: 'hr-001', date: '2024-03-01', check_in: '08:30 AM', check_out: '06:00 PM', status: 'on-time', location: 'Office' },
];

export const MOCK_LEAVES = [
    { id: '1', user_id: 'user-005', type: 'Sick Leave', start_date: '2024-03-01', end_date: '2024-03-02', status: 'approved', reason: 'Flu' },
];
