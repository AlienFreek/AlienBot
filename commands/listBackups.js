const { SlashCommandBuilder } = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-backups')
        .setDescription('Lists all available backups'),
    async execute(interaction) {
        if(interaction.member.permissionsIn(interaction.channel).has('8')){

            backup.list().then((backups) => {
                interaction.reply({
                    content: `**Available backups:**\n`+ `\`${backups.join('\n')}\``,
                    ephemeral: true
                })
            })
        }else{
            await interaction.reply({
                content: 'You must have administrator permissions to run this command.',
                ephemeral: true
            })
        }
    },
};