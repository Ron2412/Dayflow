import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/admin/AddEmployee';
import EmployeeDirectory from './pages/admin/EmployeeDirectory';
import ChangePassword from './pages/settings/ChangePassword';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import Settings from './pages/Settings';
import Payroll from './pages/Payroll';
import Layout from './components/Layout';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminPayroll from './pages/admin/AdminPayroll';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/add-employee" element={<ProtectedRoute allowedRoles={['hr']}><AddEmployee /></ProtectedRoute>} />
              <Route path="/settings/password" element={<ChangePassword />} />

              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/payroll" element={<Payroll />} />

              {/* Admin Routes */}
              <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={['hr']}><AdminAttendance /></ProtectedRoute>} />
              <Route path="/admin/payroll" element={<ProtectedRoute allowedRoles={['hr']}><AdminPayroll /></ProtectedRoute>} />

              <Route path="/employees" element={<EmployeeDirectory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
