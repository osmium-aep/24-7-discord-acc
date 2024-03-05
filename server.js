const express = require('express');

const app = express();

app.all("/", (req, res) => {
  res.send("Os Bot is running!");
});

function keepAlive() {
  app.listen(8989, () => {
    console.log("Server is ready!");
  });
}

module.exports = keepAlive;
