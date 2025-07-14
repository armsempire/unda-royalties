const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 4000;
const RELEASE_SECRET = process.env.RELEASE_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

app.post('/api/release', (req, res) => {
  const auth = req.headers['x-release-secret'];
  if (auth !== RELEASE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  exec('pnpm run release && git push', { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({ error: stderr || err.message });
    }
    res.json({ success: true, output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Release backend listening on port ${PORT}`);
}); 