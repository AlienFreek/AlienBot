const { SlashCommandBuilder } = require('discord.js');
const backup = require('discord-backup');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fetch-backups')
        .setDescription('Fetches detailed info of a backup')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('The ID of the backup you want info on')
                .setRequired(true)

        ),
    async execute(interaction) {
        if(interaction.member.permissionsIn(interaction.channel).has('8')){
            await backup.fetch(interaction.options.getString('id')).then((backupInfos) => {

                //TODO: make this date better somehow
                let created = new Date(backupInfos.data.createdTimestamp)


                let date = (created.getMonth()+1)+
                    "/"+(created.getDate()+
                    "/"+created.getFullYear()+
                    " "+created.getHours()+
                    ":"+created.getMinutes()+
                    ":"+created.getSeconds());

                interaction.reply(
                    `**Server:** \`${backupInfos.data.name}\`\n`+
                    `**Created:** \`${date}\`\n`+
                    `**Size:** \`${backupInfos.size} KB\``
                    )
            })
        }else{
            await interaction.reply('You must have administrator permissions to run this command.');
        }
    },
};