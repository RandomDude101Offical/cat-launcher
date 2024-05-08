const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client();
const prefix = '!'; // Change this to your desired prefix

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'launch') {
        const serverName = args[0];
        const letterContent = args.slice(1).join(' ');

        const server = client.guilds.cache.find(guild => guild.name === serverName);

        if (!server) {
            return message.channel.send('Server not found!');
        }

        if (!server.available) {
            return message.channel.send('Server is not available!');
        }

        const botMember = server.me;
        if (!botMember) {
            return message.channel.send('Bot is not a member of the server!');
        }

        const generalChannel = server.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(botMember).has('SEND_MESSAGES'));

        if (!generalChannel) {
            return message.channel.send('General channel not found or bot does not have permissions to send messages there!');
        }

        generalChannel.send(letterContent);
    }
});

client.login(process.env.DISCORD_TOKEN);
