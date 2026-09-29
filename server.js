require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const Project = mongoose.model('Project', new mongoose.Schema({
  title: String, description: String, tech: [String], link: String, repo: String
}));
const Message = mongoose.model('Message', new mongoose.Schema({
  name: String, email: String, message: String, createdAt: { type: Date, default: Date.now }
}));

app.get('/api/projects', async (_req, res) => {
  try { res.json(await Project.find().sort({ _id: -1 })); }
  catch { res.status(500).json({ error: 'Could not load projects' }); }
});

app.post('/api/projects', async (req, res) => { // add projects with Postman/curl
  try { res.status(201).json(await Project.create(req.body)); }
  catch { res.status(400).json({ error: 'Invalid project data' }); }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Fill in all fields' });
  await Message.create({ name, email, message });
  res.status(201).json({ ok: true });
});

const seed = [
  { title: 'Task Tracker', description: 'A kanban-style task app with login and drag-and-drop.', tech: ['React', 'Node.js', 'MongoDB'], link: '#', repo: '#' },
  { title: 'Weather Now', description: 'Live forecast dashboard using a public weather API.', tech: ['JavaScript', 'Express'], link: '#', repo: '#' },
  { title: 'Campus Notes', description: 'Notes sharing platform for students with search and tags.', tech: ['Django', 'PostgreSQL'], link: '#', repo: '#' }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(async () => {
    if (!(await Project.countDocuments())) await Project.insertMany(seed);
    app.listen(process.env.PORT || 3000, () => console.log('Running on http://localhost:' + (process.env.PORT || 3000)));
  })
  .catch(e => { console.error('Database connection failed:', e.message); process.exit(1); });
