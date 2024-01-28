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
        //Option is not required to send the command but it IS required
        //to actually load a backup (as it fully wipes the server).
        .addStringOption(option =>
            option.setName('confirmation')
                .setDescription('Confirm loading of backup \'CONFIRM\' ')
                .setRequired(false)),
    async execute(interaction) {
        const id = interaction.options.getString('id')

        //Check if user running command is the owner of the guild they
        //are attempting to load the backup in. If not, cancel command
        if(!interaction.member.id !== interaction.guild.ownerId) {
            interaction.reply(`You must be the server owner to load a backup.`);
            return;
        }

        backup.fetch(id).then(backupInfos => { //If backup exists then =>
            //Check if specified backup belongs to the server the command was ran from
            if(interaction.guildId !== backupInfos.data.guildID) {
                interaction.reply({
                    content:`This backup does not belong to this server!`,
                    ephemeral: true});
                return;
            }

            if (interaction.options.getString('confirmation') !== 'CONFIRM') {
                interaction.reply(
                    '**This will wipe the server and load the selected backup!**\n' +
                    `**Use** \`/load-backup ${id} CONFIRM\` **to continue**`
                );
                return;
            }

            backup.load(id, interaction.guild, {
                clearGuildBeforeRestore: true,
                maxMessagesPerChannel: Number.MAX_SAFE_INTEGER
            }).then(() => {
                //DM user who started backup upon completion. Also output to console
                interaction.member.user.send('Loaded backup in server "'+interaction.guild.name+'"').catch(console.error)
                console.log(`Loaded backup ${id} on guild ${interaction.guildId}`);
            })

        }).catch(() => { interaction.reply(`**Backup with ID** \`${id}\` **not found.**`) }) //Catch if no backup exists
    },
};