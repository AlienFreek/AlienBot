module.exports = {
    name: 'messageCreate',
    execute(interaction) {
        console.log(`message received in #${interaction.channel.name}(${interaction.channel.id}) by ${interaction.member.user.tag}(${interaction.member.user.id})`);
    },
};