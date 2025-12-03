const bcrypt = require('bcrypt');
const db = require('../config/db');

const login = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or nickname

  try {
    // Check if identifier is email or nickname
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR nickname = ?',
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data (exclude password_hash)
    const { password_hash, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const register = async (req, res) => {
  const { email, nickname, password, role } = req.body;

  try {
    // Check if email/nickname exists
    const [existing] = await db.execute(
      'SELECT * FROM users WHERE email = ? OR (nickname IS NOT NULL AND nickname = ?)',
      [email, nickname]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    await db.execute(
      'INSERT INTO users (email, nickname, password_hash, role) VALUES (?, ?, ?, ?)',
      [email, nickname || null, passwordHash, role]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, email, nickname, role, created_at FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists and is not admin
    const [rows] = await db.execute('SELECT role FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (rows[0].role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, nickname, role } = req.body;
  try {
    // Check if user exists and is not admin (can't change admin roles)
    const [rows] = await db.execute('SELECT role FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (rows[0].role === 'admin') {
      return res.status(403).json({ message: 'Cannot modify admin users' });
    }

    // Check if email is already taken by another user
    const [existing] = await db.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    await db.execute(
      'UPDATE users SET email = ?, nickname = ?, role = ? WHERE id = ?',
      [email, nickname || null, role, id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, register, getUsers, deleteUser, updateUser };