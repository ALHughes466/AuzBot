module.exports = {
    name: 'sound',
    description: 'that\'s what you sound like',
    async execute(client, cmd, message, args, Discord){
        const hah = client.emojis.cache.find(emoji => emoji.name === "HAH")
        message.reply(`THAT\'S WHAT YOU SOUND LIKE ${hah}`);
    }
}