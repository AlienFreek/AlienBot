const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../index.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Provide bot stats and information'),
    async execute(interaction) {
        await interaction.reply('Developed by <@371639278104739841>\n' +
            `Currently active in ${client.guilds.cache.size} server(s)\n` +
            `This bot is open source! <https://github.com/AlienFreek/AlienBot>`
        );
    },
};