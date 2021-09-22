module.exports = {
    name: 'pog',
    description: 'that\'s what you sound like',
    async execute(client, cmd, message, args, Discord){
        const pog = client.emojis.cache.find(emoji => emoji.name === "pog")
        message.reply(`${pog}`);
    }
}