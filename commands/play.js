const { SlashCommandBuilder } = require('discord.js');
const { join } = require('node:path');
const { existsSync } = require('node:fs');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, VoiceConnectionStatus } = require('@discordjs/voice');
const mp3Duration = require('mp3-duration');
const extensions = ['.mp3', '.m4a', '.mp4', '.wav', '.wma', '.aax', 'flac']

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

        //If user isn't in a voice channel, end interaction
        if(!interaction.member.voice.channel){
            interaction.reply('You must be in a voice channel to use this command!');
            return;
        }

        let fileDuration = 300_000;
        //Create string containing user entered file and another for the file extension
        let userFile = interaction.options.getString('file')
        let userExtension = userFile.slice(-4)

        //If invalid file extension, elseif file cant be found, else if both are valid
        if (extensions.indexOf(userExtension) === -1){
            interaction.reply('Invalid file extension.')
        } else if (!existsSync('./audiofiles/' + userFile)){
            interaction.reply('File not found.')
        } else{
            await interaction.reply('Success! file found and validated')

            //Make a clean path for redundancy
            let fullPath = join(__dirname, '..', 'audiofiles', userFile)

            //TODO: Find a solution to get file length of all supported formats.
            //Currently only supports .mp3 files.
            //Duration set to 5 minutes by default
            if (userExtension === '.mp3'){
                mp3Duration(fullPath, function (err, duration) {
                    fileDuration = Math.ceil(duration)+'_000';
                });
            }

            let resource = createAudioResource(fullPath);
            const player = createAudioPlayer();
            player.play(resource);

            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            });
            const subscription = connection.subscribe(player);

            connection.on(VoiceConnectionStatus.Ready, () => {
                console.log('Connection success. Playing file: '+ fullPath);
            });

            //Destroy connection and leave voice channel upon file completion
            setTimeout(()=> connection.destroy(), fileDuration);
        }
    },
}