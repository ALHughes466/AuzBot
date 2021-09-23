const dotenv = require('dotenv')
dotenv.config()

process.traceDeprecation = true;
const Discord = require('discord.js')
const Intents = Discord.Intents
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const fs = require('fs');

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: true,
    timeout: 150000
});

client.player = player;
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})


client.login((process.env.TOKEN));
