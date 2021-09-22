module.exports = (Discord, client, messageCreate) => {
    const prefix = '?';
    if(!messageCreate.content.startsWith(prefix) || messageCreate.author.bot) return;

    const args = messageCreate.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    
    //if(command) command.execute(client, messageCreate, args, Discord);

    try{
        command.execute(client, cmd, messageCreate, args, Discord);
    } catch (err) { 
        messageCreate.reply("There was an error with this command!");
        console.log(err);
    }
}