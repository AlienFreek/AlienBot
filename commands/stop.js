const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Play audio file')
        .addStringOption(option =>
            option.setName('file')
                .setDescription('The file to play')
                .setRequired(true)

        ),
    async execute(interaction) {



    },
};