const keepAlive = require("./server.js");
const Discord = require("discord.js-selfbot-v13");
require('dotenv').config();


const client = new Discord.Client({
    checkUpdate: false,
});

// Error handling for client login
try {
    client.login(process.env["TOKEN"]);
} catch (error) {
    console.error("Error during login:", error);
}

keepAlive();
