const keepAlive = require("./server.js");
const Discord = require("discord.js-selfbot-v13");
require('dotenv').config();


const client = new Discord.Client({
  checkUpdate: false,
});

let executedOnStart = false;

let scedule = [
  {
    startHour: 6,
    startMinute: 0,
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
    startHour: 7,
    startMinute: 0,
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
    startHour: 9,
    startMinute: 30,
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
    startHour: 10,
    startMinute: 30,
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
    startHour: 11,
    startMinute: 0,
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
    startHour: 16,
    startMinute: 50,
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
    startHour: 17,
    startMinute: 0,
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
    startHour: 18,
    startMinute: 0,
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
    startHour: 19,
    startMinute: 30,
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
    startHour: 22,
    startMinute: 0,
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
    // executeScheduledCode();
    executeOnStart();
    executedOnStart = true;
  }
});

function getTime() {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  return {
    currentHour,
    currentMinutes,
    currentSeconds,
  };
}
function executeOnStart(){
    const currentTime = getTime();
    console.log(currentTime)
    for(let i = 0; i < scedule.length; i++){
        if(currentTime.currentHour > scedule[i].startHour && currentTime.currentHour < scedule[i + 1].startHour){
            scedule[i].execute();
            
        }else if(currentTime.currentHour == scedule[i].startHour && currentTime.currentHour == scedule[i + 1].startHour){
            if(currentTime.currentMinutes > scedule[i].startMinute && currentTime.currentMinutes < scedule[i + 1].startMinute){
                scedule[i].execute();
            }
        }
    }

}
function executeScheduledCode() {
  try {
    const currentTime = getTime();
    for (let i = 0; i < scedule.length; i++) {
      const scheduleItem = scedule[i];

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
