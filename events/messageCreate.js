module.exports = {
    name: 'messageCreate',
    execute(interaction) {
        console.log(`message received in ${interaction.channelId}`);
    },
};