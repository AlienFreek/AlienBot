const { SlashCommandBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const backup = require('discord-backup');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-backup')
        .setDescription('Creates a new backup'),
    async execute(interaction) {
        if(interaction.member.permissionsIn(interaction.channel).has('8')){

            await backup.create(interaction.guild, {
                maxMessagesPerChannel: Number.MAX_SAFE_INTEGER,
                jsonSave: true,
                jsonBeautify: true,
                doNotBackup: [], //[ "roles",  "channels", "emojis", "bans" ]
                saveImages: "base64" // "base64" "url"
                }).then((backupData) => {
                    interaction.reply(
                        `**Backup done**.\n`+
                        `**Backup ID:** \`${backupData.id}\`\n`+
                        `**Use** \`/load-backup ${backupData.id}\` **to load the backup**`
                    );
                });
        }else{
            await interaction.reply('You must have administrator permissions to run this command.');
        }
    },
};