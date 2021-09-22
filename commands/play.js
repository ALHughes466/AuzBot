const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const {joinVoiceChannel} = require('@discordjs/voice');
const { RepeatMode } = require('discord-music-player');


module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'playlist', 'pl', 'loopsong', 'loopqueue', 'setvolume', 'seek', 'clear', 'shuffle', 'volume', 'nowplaying', 'np', 'pause', 'resume', 'remove', 'queue', 'q'],
    cooldown: 0,
    description: 'YT Music Script',
    async execute(client, cmd, message, args, Discord){
        let guildQueue = client.player.getQueue(message.guild.id);

        if (cmd === 'play' || cmd === 'p') { //PLAY
            let queue = client.player.createQueue(message.guild.id);
            try {
                if (!args[0]) {
                    message.reply('❌ **Please specify a song!**');
                }
                else if (message.member.voice.channel ){
                    await queue.join(message.member.voice.channel);
                    let song = await queue.play(args.join(' ')).catch(_ => {
                        if (!guildQueue)
                            queue.stop();
                        
                    });
                    //let songName = song.name.toString();
                    //message.reply(`🎶 **${songName}** added to queue!`)
                } else {
                    message.reply('You need to be in a voice channel to use this command.');
                }
            } catch (err) {
                message.reply(`❌ **There was an error. I threw it out. Please try again.**`);
                console.log(err);
            }
            
        } else if (cmd === 'skip') { //SKIP
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.skip();
                message.reply('*Skipped* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.');
            }
        } else if (cmd === 'stop') { //STOP
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.stop();
                message.reply('*Stopped* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.');
            }
        } else if (cmd === 'loopqueue'){ //LOOPQUEUE
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                if (!guildQueue.RepeatMode === 2){
                    guildQueue.setRepeatMode(RepeatMode.QUEUE);
                } else {
                    guildQueue.setRepeatMode(RepeatMode.DISABLED);
                }
                message.reply('*Toggled queue loop* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.');
            }
        } else if (cmd === 'loopsong'){ //LOOPSONG
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                if (!guildQueue.RepeatMode === 1){
                    guildQueue.setRepeatMode(RepeatMode.SONG);
                } else {
                    guildQueue.setRepeatMode(RepeatMode.DISABLED);
                }
                message.reply('*Toggled song loop* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.');
            }
        } else if (cmd === 'volume'){ //SETVOLUME
            if (!guildQueue){
                message.reply(`*Volume is set to ${guildQueue.volume}*`)
            } else if (!args[0]){
                message.reply('❌ **Please specify the new volume.**')
            } else if (message.member.voice.channel) {
                guildQueue.setVolume(parseInt(args[0]));
                message.reply(`*Volume set to ${parseInt(args[0]).toString()}* 👍`);
            } else {
                message.reply('You need to be in a voice channel to use this command.')
            }
        } else if (cmd === 'clear'){ //CLEAR QUEUE
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.clearQueue();
                message.reply('*Queue cleared* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.')
            }
        } else if (cmd === 'shuffle') { //SHUFFLE QUEUE
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.shuffle();
                message.reply('*Queue shuffled* 👍');
            } else {
                message.reply('You need to be in a voice channel to use this command.')
            }
        } else if (cmd === 'nowplaying' || cmd === 'np') {
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (client.voice.channel){
                const ProgressBar = guildQueue.createProgressBar();
                message.reply(`Now playing: **${guildQueue.nowPlaying}**\n${ProgressBar.prettier}`)
            }
        } else if (cmd === 'pause') {
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.setPaused(true);
                message.reply('*Queue paused* 👍')
            } else {
                message.reply('You need to be in a voice channel to use this command.')
            }
        } else if (cmd === 'resume') {
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else if (message.member.voice.channel) {
                guildQueue.setPaused(false);
                message.reply('*Queue resumed* 👍')
            } else {
                message.reply('You need to be in a voice channel to use this command.')
            }
        } else if (cmd === 'seek') {
            guildQueue.seek(parseInt(args[0]) * 1000)
        } else if (cmd === 'playlist') {
            let queue = client.player.createQueue(message.guild.id);
            try{
                if (!args[0]) {
                    message.reply('❌ **Please specify a song!**');
                }
                else if (message.member.voice.channel){
                    await queue.join(message.member.voice.channel);
                    let song = await queue.playlist(args.join(' ')).catch(_ => {
                        if (!guildQueue)
                            queue.stop();
                        
                    });
                    let songName = song.name.toString();
                    message.reply(`🎶 **${songName}** added to queue!`)
                } else {
                    message.reply('You need to be in a voice channel to use this command.');
                }
            } catch (err) {
                message.reply(`❌ **There was an error. I threw it out. Please try again.**`);
                console.log(err);
            }
        } else if (cmd === 'queue' || cmd === 'q') {
            if (!guildQueue){
                message.reply('❌ **I\'m not connected to a channel.**')
            }
            else {
                message.reply(`${guildQueue}`)
            }
        }
    }
}