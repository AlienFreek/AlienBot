const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        //testing ability to send DMs
        interaction.member.user.send('d').catch(console.error)
        interaction.reply('pong')
    },
};