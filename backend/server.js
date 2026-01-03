const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase Admin Client (using service role key)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.get('/', (req, res) => {
  res.send('Dayflow HRMS Backend Running');
});

/**
 * HR-Only Endpoint to create a new employee
 */
app.post('/api/admin/create-employee', async (req, res) => {
  const { email, password, fullName, employeeId, role } = req.body;

  try {
    // 1. Create the user in Auth
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-verify email for now as requested or set to false for real flow
      user_metadata: {
        full_name: fullName,
        employee_id: employeeId,
        role: role
      }
    });

    if (error) throw error;

    res.status(201).json({ success: true, user: data.user });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
