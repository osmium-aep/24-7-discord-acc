const keepAlive = require("./server.js");
const Discord = require("discord.js-selfbot-v13");
require('dotenv').config();

const client = new Discord.Client({
  checkUpdate: false,
});

let executedOnStart = false;

let schedule = [
  {
    startHour: 0,    // Adjusted from 6
    startMinute: 30, // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Getting Ready For School",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 1,    // Adjusted from 7
    startMinute: 30, // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "In School rn",
            type: "PLAYING",
          },
        ],
        status: "dnd",
      });
    },
  },
  {
    startHour: 4,    // Adjusted from 9
    startMinute: 0,  // Adjusted from 30
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Learning 'c'",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 5,    // Adjusted from 10
    startMinute: 0,  // Adjusted from 30
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Cleaning Setup",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 5,    // Adjusted from 11
    startMinute: 30, // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Chillin ☕",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 11,    // Adjusted from 16
    startMinute: 20,  // Adjusted from 50
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Getting Ready For Tution",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 11,    // Adjusted from 17
    startMinute: 30,  // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Math's Tution",
            type: "PLAYING",
          },
        ],
        status: "dnd",
      });
    },
  },
  {
    startHour: 12,    // Adjusted from 18
    startMinute: 30,  // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Free Fire",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 14,    // Adjusted from 19
    startMinute: 0,   // Adjusted from 30
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Chillin ☕",
            type: "PLAYING",
          },
        ],
        status: "idle",
      });
    },
  },
  {
    startHour: 17,    // Adjusted from 22
    startMinute: 30,  // Adjusted from 0
    startSecond: 1,
    execute: () => {
      client.user.setPresence({
        activities: [
          {
            name: "Sleep",
            type: "PLAYING",
          },
        ],
        status: "dnd",
      });
    },
  },
];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Execute code on start
  if (!executedOnStart) {
    executeOnStart();
    executedOnStart = true;
  }
});

function getTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getUTCHours();    // Use UTC methods to get GMT time
  const currentMinutes = currentDate.getUTCMinutes();
  const currentSeconds = currentDate.getUTCSeconds();
  return {
    currentHour,
    currentMinutes,
    currentSeconds,
  };
}

function executeOnStart(){
    const currentTime = getTime();
    console.log(currentTime)
    for(let i = 0; i < schedule.length; i++){
        if(currentTime.currentHour > schedule[i].startHour && currentTime.currentHour < schedule[i + 1].startHour){
            schedule[i].execute();
            
        }else if(currentTime.currentHour == schedule[i].startHour && currentTime.currentHour == schedule[i + 1].startHour){
            if(currentTime.currentMinutes > schedule[i].startMinute && currentTime.currentMinutes < schedule[i + 1].startMinute){
                schedule[i].execute();
            }
        }
    }
}

function executeScheduledCode() {
  try {
    const currentTime = getTime();
    for (let i = 0; i < schedule.length; i++) {
      const scheduleItem = schedule[i];

      if (
        scheduleItem.startHour === currentTime.currentHour &&
        scheduleItem.startMinute === currentTime.currentMinutes &&
        scheduleItem.startSecond === currentTime.currentSeconds
      ) {
        scheduleItem.execute();
        console.log("Scheduled code executed at", currentTime);
      }
    }
  } catch (error) {
    console.error("Error during scheduled code execution:", error);
  }
}

setInterval(executeScheduledCode, 1000);

// Error handling for client login
try {
  client.login(process.env["TOKEN"]);
} catch (error) {
  console.error("Error during login:", error);
}

keepAlive();
