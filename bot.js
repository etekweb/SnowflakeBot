const { token } = require("./secret.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

// .startsWith = commands
// .includes = memes to post if someone says keyword in message
client.on("message", (message) => {
  
  // New Team method
  if (message.content.startsWith("!newteam")) {
    const msgArr = message.content.split(" ");  // ['!newteam', 'team', 'name', 'here']
    const teamNameArr = msgArr.slice(1);        // ['team', 'name', 'here']
    const teamName = teamNameArr.join(" ");     // 'team name here'

    // Verify team name was specified in command
    if (msgArr.length >= 2) {
      // Verify given team name doesn't already exist
      const role = message.guild.roles.cache.find(
        (x) => x.name === "[TEAM]" + teamName
      );
      if (!role) {
        // Verify user isn't on another team already
        const userHasTeam = message.member.roles.cache.find((x) =>
          x.name.startsWith("[TEAM]")
        );
        if (!userHasTeam) {
          // Create new empty role for the team to use
          message.guild.roles
            .create({
              data: {
                name: "[TEAM]" + teamName,
                hoist: false,
                mentionable: false,
              },
              reason:
                "Team role created by " +
                message.author.username +
                "#" +
                message.author.discriminator,
            })
            .then((role) => {
              // Give user the new role
              message.member.roles.add(role);
              // Create new text channel for team (based on #do-not-delete)
              client.channels.fetch("801902799385788447").then((ch) => {
                ch.clone({
                  name: teamNameArr.join("-") + "-chat",
                  // private to view by team (and admin) only
                  permissionOverwrites: [
                    {
                      id: role.id,
                      allow: ["VIEW_CHANNEL"],
                    },
                    {
                      id: message.guild.id,
                      deny: ["VIEW_CHANNEL"],
                    },
                  ],
                  // reason stored in admin log
                  reason:
                    "Team created by " +
                    message.author.username +
                    "#" +
                    message.author.discriminator,
                });
              });
              // Create new voice channel for team (based on DO NOT DELETE VC)
              client.channels.fetch("801902869191196732").then((ch) => {
                ch.clone({
                  name: teamName + " Voice/Video",
                  // private to view by team (and admin) only
                  permissionOverwrites: [
                    {
                      id: role.id,
                      allow: ["VIEW_CHANNEL"],
                    },
                    {
                      id: message.guild.id,
                      deny: ["VIEW_CHANNEL"],
                    },
                  ],
                  // reason stored in admin log
                  reason:
                    "Team created by " +
                    message.author.username +
                    "#" +
                    message.author.discriminator,
                });
              });
            });
        } else {
          message.reply("you already have a team.");
          // TODO - add a way to remove yourself from a team
        }
      } else {
        message.reply(
          "that team name is already taken. Try again with a different name."
        );
      }
    } else {
      message.reply([
        "you must specify a team name.",
        "`!newteam <team name>`",
      ]);
    }
  }
});

client.login(token);
