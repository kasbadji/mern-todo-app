// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// helper function to create tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '15m' }); // short life
  const refreshToken = jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: '7d' }); // longer life
  return { accessToken, refreshToken };
};

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken; // save only refresh token
    await user.save();

    res.json({
      message: 'user created',
      accessToken,
      refreshToken,
      user: { id: user._id, username, email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'sign up failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'failed to login' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: 'login success',
      accessToken,
      refreshToken,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'login failed' });
  }
};

// Refresh token endpoint
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      const accessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'refresh failed' });
  }
};

module.exports = { signUp, login, refresh };
