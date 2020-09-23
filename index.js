require('dotenv').config();
DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const {Client} = require('discord.js');
const client = new Client({disableEveryone: true})
const ytdl = require('ytdl-core');
const opusscript = require('opusscript')
const PREFIX = '!';

let servers = [];

client.once('ready', () => {
    console.log('running and ready!')
})


client.on('message', message => {
    if(message.content === '!ping') {
        const user = message.author;
        message.channel.send(`Hey, ${user}! How can I help you?`)
    }
});

client.on('message', async message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    const user = message.author;

    switch(args[0]) {
        case 'play':
            if(!args[1]){
                message.channel.send(`Whoops! ${user} please let me know what song to play!`);
                return;
            };

            if(!message.member.voice.channel){
                message.channel.send(`Sorry ${user}! Please join a voice channel!`);
                return;
            };

            try {
                let connection = await message.member.voice.channel.join()
            }catch(error){
                console.log('There was an error conneciton the voice channel:', error);
                return message.channel.send(`Sorry ${user}, I'm having trouble joining the voice channel: ${error}`)
            };

            const dispatcher = connection.play(ytdl(args[1]))
            .on('finish', () => {
                message.member.voice.channel.leave()
            }).on('error', error => {
                console.log('error on playing:', error)
            })

            dispatcher.setVolumeLogarithmic(5 / 5);
        case 'stop':
            try{
                message.member.voice.channel.leave()
            }catch(error){
                console.log('error in stop command', error)
            }

    }

})

client.login(DISCORD_TOKEN)