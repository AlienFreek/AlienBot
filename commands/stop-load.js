const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop-load')
        .setDescription('Will turn the bot off'),
    async execute(interaction) {

        //process.exit()
    }
}