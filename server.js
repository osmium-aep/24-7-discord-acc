const express = require('express');

const app = express();

app.all("/", (req, res) => {
  res.send({statusCode: 200});
});

function keepAlive() {
  app.listen(8989, () => {
    console.log("Server is ready!");
  });
}

module.exports = keepAlive;
