const { ApiKey, User } = require('../models');

module.exports = async function authenticateApiKey(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const apiKey = await ApiKey.findOne({
      where: { key: token },
      include: [User]
    });

    if (!apiKey) {
      return res.status(403).json({ error: 'Invalid API key' });
    }

    // Optional: update lastUsedAt
    apiKey.lastUsedAt = new Date();
    await apiKey.save();

    req.user = apiKey.User; // Attach the user to the request
    next();
  } catch (err) {
    console.error('API Key Auth Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
