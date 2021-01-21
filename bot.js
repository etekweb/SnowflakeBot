const { token } = require("./secret.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

// .startsWith = commands
// .includes = memes to post if someone says keyword in message
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
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
