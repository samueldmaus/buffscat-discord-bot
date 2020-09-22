require('dotenv').config();
DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('ready!')
})

client.login(DISCORD_TOKEN)

client.on('message', message => {
    console.log(message.content)
})