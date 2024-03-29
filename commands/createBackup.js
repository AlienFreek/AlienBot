const { SlashCommandBuilder } = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-backup')
        .setDescription('Creates a new backup'),
    async execute(interaction) {
        //Check if user has Admin in the guild they sent command
        if(!interaction.member.permissionsIn(interaction.channel).has('8')){
            await interaction.reply('You must have administrator permissions to run this command.');
            return;
        }
        //Backup can take a while in large servers, must deferReply() until the backup is complete
        await interaction.deferReply({ ephemeral: true });

        await backup.create(interaction.guild, {
            maxMessagesPerChannel: Number.MAX_SAFE_INTEGER,
            jsonSave: true,
            jsonBeautify: true,
            doNotBackup: [], //[ "roles",  "channels", "emojis", "bans" ]
            saveImages: "base64" // "base64" "url"
        }).then(async (backupData) => {
            await interaction.editReply(
                `**Backup done**.\n` +
                `**Backup ID:** \`${backupData.id}\`\n` +
                `**Use** \`/load-backup ${backupData.id}\` **to load the backup**`
            );
        });
    },
};