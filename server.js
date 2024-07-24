const express = require("express");
const path = require("node:path");

const PORT = 3005;


const expressApp = express();
console.log()
expressApp.use(express.static(path.join(__dirname, "Learning")));

expressApp.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

server = expressApp.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});