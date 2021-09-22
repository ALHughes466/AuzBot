module.exports = {
    name: 'ping',
    description: 'ping test command',
    async execute(client, cmd, message, args, Discord){
        message.reply('pong');
    }
}