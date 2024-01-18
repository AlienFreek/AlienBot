const { SlashCommandBuilder } = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recover-members')
        .setDescription('Fetches detailed info of a backup')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('The ID of the backup you want info on')
                .setRequired(true)

        ),
    async execute(interaction) {
        if(interaction.member.permissionsIn(interaction.channel).has('8')){

        }else{
            await interaction.reply('You must have administrator permissions to run this command.');
        }
    },
};