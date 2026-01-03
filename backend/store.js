const store = {
    users: [
        {
            id: '1',
            email: 'hr@odooindia.com',
            password: 'admin', // In a real app, hash this!
            full_name: 'Sarah Smith',
            role: 'hr',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
            job_title: 'HR Manager',
            department: 'Human Resources',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            join_date: '2020-03-15',
            employee_id: 'EMP-001'
        },
        {
            id: '2',
            email: 'john@odooindia.com',
            password: 'user',
            full_name: 'John Doe',
            role: 'employee',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
            job_title: 'Software Engineer',
            department: 'Engineering',
            phone: '+1 (555) 987-6543',
            location: 'New York, NY',
            join_date: '2021-06-01',
            employee_id: 'EMP-002'
        },
        {
            id: '3',
            email: 'elena@odooindia.com',
            password: 'user',
            full_name: 'Elena Rodriguez',
            role: 'employee',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
            job_title: 'Product Designer',
            department: 'Design',
            phone: '+1 (555) 456-7890',
            location: 'Austin, TX',
            join_date: '2022-01-10',
            employee_id: 'EMP-003'
        }
    ],
    attendance: [
        {
            id: 1,
            user_id: '2', // John Doe
            date: '2025-10-26',
            check_in: '09:00 AM',
            check_out: '05:00 PM',
            status: 'Present',
            efficiency: 96
        },
        {
            id: 2,
            user_id: '2',
            date: '2025-10-27',
            check_in: '09:15 AM',
            check_out: '05:30 PM',
            status: 'Present',
            efficiency: 92
        }
    ],
    payroll: [
        {
            user_id: '1',
            basic: 5000,
            hra: 2000,
            allowances: 1000,
            deductions: 500,
            net_salary: 7500,
            status: 'processed'
        },
        {
            user_id: '2',
            basic: 4000,
            hra: 1500,
            allowances: 800,
            deductions: 300,
            net_salary: 6000,
            status: 'pending'
        }
    ],
    leaves: []
};

module.exports = store;
