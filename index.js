const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token, bot_info} = require('./config.json');
const prefixx = ';';



client.once('ready', () => {
console.log(token)
console.log(bot_info)
console.log(prefix)
client.user.setActivity(`Watching Retro Treehouse!`);
});

client.login(process.env.token);

client.on('message', message => {
  if (message.content === `${prefix}ping`) {
      message.channel.send('Pong!');
  }
});

client.on('message', message => {
  let msg = message;
  let args = msg.content.slice(prefixx.length).split(/ +/);
  let command = args.shift().toLowerCase();
  let cmd = command;



  if(cmd === 'kick'){
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send("You don't have permission to kick members.");
    let toKick = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if(!args[0]) return msg.channel.send('Metion someone to kick. 🦵');
    if(!toKick) return msg.channel.send(`${args[0]} is no longer a member.`);
    if(!reason) return msg.channel.send('Next time, add a reason. 📂');

    if(!toKick.kickable){
        return msg.channel.send('Admins are not kickable.🦵');
    }

    if(toKick.kickable){
        let x = new Discord.MessageEmbed()
        .setTitle('Kicked User🦵')
        .addField('Member Kicked', toKick)
        .addField('Kicked by', msg.author)
        .addField('Reason', reason)
        .addField('Date', msg.createdAt)
        .setColor(0x7289da);

        msg.channel.send(x);
        toKick.kick();
    }
}

if(cmd === 'ban'){
  if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You don't have permission to ban members.");
  let toBan = msg.mentions.members.first();
  let reason = args.slice(1).join(" ");
  if(!args[0]) return msg.channel.send('Please mention someone to ban. 🔨');
  if(!toBan) return msg.channel.send(`${args[0]} is no longer a member!`);
  if(!reason) return msg.channel.send('Next time, add a reason. 📂');

  if(!toBan.bannable){
      return msg.channel.send('Admins are not bannable. 🔨');
  }

  if(toBan.bannable){
      let x = new Discord.MessageEmbed()
      .setTitle('Banned Member 🔨')
      .addField('Member Banned', toBan)
      .addField('Banned by', msg.author)
      .addField('Reason', reason)
      .addField('Date', msg.createdAt)
      .setColor(0x7289da);

      msg.channel.send(x);
      toBan.ban();
  }
}

if (cmd === 'clear' || cmd === 'purge'){
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You can't use this command!");
  if(!args[0]) return msg.channel.send("Specify how many messages you want to delete.");
  msg.delete();
  msg.channel.bulkDelete(args[0]).catch(e => { msg.channel.send("You can only delete 100 messages at once.")});
  msg.channel.send(`Successfully deleted \`${args[0]} messages\``).then(m => m.delete({ timeout: 5000 }));
}
});