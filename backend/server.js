const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const store = require('./store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// --- AUTH ROUTES ---

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find(u => u.email === email && u.password === password);

  if (user) {
    // Return user info (excluding password)
    const { password, ...userInfo } = user;
    res.json({ success: true, user: userInfo });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { email, password, fullName, employeeId, role } = req.body;

  if (store.users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const newUser = {
    id: String(Date.now()),
    email,
    password,
    full_name: fullName,
    role: role || 'employee',
    employee_id: employeeId || `EMP-${Date.now()}`,
    avatar: '',
    job_title: 'New Joiner',
    department: 'General',
    join_date: new Date().toISOString().split('T')[0]
  };

  store.users.push(newUser);
  const { password: _, ...userInfo } = newUser;
  res.status(201).json({ success: true, user: userInfo });
});

// --- EMPLOYEE ROUTES ---

app.get('/api/employees', (req, res) => {
  // Return all users with public info
  const employees = store.users.map(({ password, ...u }) => u);
  res.json(employees);
});

app.get('/api/employees/:id', (req, res) => {
  const user = store.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...userInfo } = user;
  res.json(userInfo);
});

// --- ATTENDANCE ROUTES ---

app.get('/api/attendance', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const userAttendance = store.attendance.filter(a => a.user_id === userId);
    res.json(userAttendance);
  } else {
    // Admin: all attendance
    // Join with user info for display
    const allAttendance = store.attendance.map(record => {
      const user = store.users.find(u => u.id === record.user_id);
      return { ...record, employee_name: user ? user.full_name : 'Unknown' };
    });
    res.json(allAttendance);
  }
});

app.post('/api/attendance/check-in', (req, res) => {
  const { userId } = req.body;
  const today = new Date().toISOString().split('T')[0];

  // Check if already checked in today
  const existing = store.attendance.find(a => a.user_id === userId && a.date === today);
  if (existing) {
    return res.status(400).json({ message: 'Already checked in today' });
  }

  const newRecord = {
    id: Date.now(),
    user_id: userId,
    date: today,
    check_in: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    check_out: '-',
    status: 'Present',
    efficiency: 0
  };
  store.attendance.push(newRecord);
  res.status(201).json(newRecord);
});

app.post('/api/attendance/check-out', (req, res) => {
  const { userId } = req.body;
  const today = new Date().toISOString().split('T')[0];

  const record = store.attendance.find(a => a.user_id === userId && a.date === today);
  if (!record) {
    return res.status(404).json({ message: 'No check-in record found for today' });
  }

  record.check_out = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  // Calculate mock efficiency
  record.efficiency = Math.floor(Math.random() * (100 - 80 + 1)) + 80;

  res.json(record);
});

// --- PAYROLL ROUTES ---

app.get('/api/payroll', (req, res) => {
  const { userId } = req.query;
  if (userId) {
    const userPayroll = store.payroll.find(p => p.user_id === userId);
    res.json(userPayroll || null);
  } else {
    // Admin view
    const allPayroll = store.payroll.map(p => {
      const user = store.users.find(u => u.id === p.user_id);
      return { ...p, employee: user ? user.full_name : 'Unknown', role: user?.role };
    });
    res.json(allPayroll);
  }
});


app.put('/api/payroll/:userId', (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  let record = store.payroll.find(p => p.user_id === userId);
  if (!record) {
    record = { user_id: userId, ...updates };
    store.payroll.push(record);
  } else {
    Object.assign(record, updates);
  }

  res.json(record);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
