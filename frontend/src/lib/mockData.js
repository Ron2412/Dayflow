export const MOCK_USER = {
    id: 'user-001',
    email: 'employee@odooindia.com',
    full_name: 'John Doe',
    role: 'employee',
    employee_id: 'OIJODO2024001',
    hourly_rate: 25.0,
};

export const MOCK_HR = {
    id: 'hr-001',
    email: 'hr@odooindia.com',
    full_name: 'Sarah Smith',
    role: 'hr',
    employee_id: 'OISASM2024001',
    hourly_rate: 45.0,
};

export const MOCK_ATTENDANCE = [
    { id: '1', user_id: 'user-001', date: '2024-03-01', check_in: '2024-03-01T09:00:00Z', check_out: '2024-03-01T17:00:00Z', status: 'present' },
    { id: '2', user_id: 'user-001', date: '2024-03-02', check_in: '2024-03-02T08:30:00Z', check_out: '2024-03-02T16:30:00Z', status: 'present' },
];

export const MOCK_LEAVES = [
    { id: '1', user_id: 'user-001', type: 'sick', start_date: '2024-02-15', end_date: '2024-02-16', status: 'approved' },
];
