const { token } = require("./secret.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

// .startsWith = commands
// .includes = memes to post if someone says keyword in message
client.on("message", (message) => {
  if (message.content.startsWith("!newteam")) {
    client.channels.fetch('801902799385788447').then((ch) => {
      ch.clone({
        name: "group1-chat",
        reason: "TEST 1234"
      });
    });
    client.channels.fetch('801902869191196732').then((ch) => {
      ch.clone({
        name: "Group 1 Voice/Video",
        reason: "TEST 2345"
      });
    });
  }
});

client.login(token);

/**
 * Function to return a random
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);

  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
