const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('./generated/prisma');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/wait-list', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json({ message: 'User added to waitlist', user });
  } catch (error) {
    if (error.code === 'P2002') {
      // Unique constraint failed on email
      return res.status(409).json({ error: 'Email already on waitlist.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 