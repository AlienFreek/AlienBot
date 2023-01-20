const { SlashCommandBuilder } = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('load-backup')
        .setDescription('Load a backup (!!!THIS WILL WIPE SERVER!!!)')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('The ID of the backup you want to load (!!!THIS WILL WIPE SERVER!!!)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('confirmation')
                .setDescription('Confirm loading of backup')
                .setRequired(false)),
    async execute(interaction) {
        const id = interaction.options.getString('id')

        if(!interaction.member.permissionsIn(interaction.channel).has('8')) {
            interaction.reply(`You must have Administrator privileges to load a backup.`)
            return;
        }
        backup.fetch(id).then(backupInfos => {
            if(interaction.guildId !== backupInfos.data.guildID) {
                interaction.reply(`This backup does not belong to this server!`)
                return;
            }
            if (interaction.options.getString('confirmation') === 'CONFIRM') {
                backup.load(id, interaction.guild).then(() => {
                    console.log(`Loaded backup ${id} on guild ${interaction.guildId}`)
                })
            } else {
                interaction.reply(
                    '**This will wipe the server and load the selected backup!**\n' +
                    `**Use** \`/load-backup ${id} CONFIRM\` **to continue**`
                )}
        }).catch(() => { interaction.reply(`**Backup with ID** \`${id}\` **not found.**`) })
    },
};