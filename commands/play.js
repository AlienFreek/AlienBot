const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior, createAudioResource} = require('@discordjs/voice');
const { player } = require('../index.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play audio file')
        .addStringOption(option =>
            option.setName('file')
                .setDescription('The file to play')
                .setRequired(true)
        ),
    async execute(interaction) {
        const resource = createAudioResource(interaction.options.getString('file'));
        //player.play(resource)


    },
}