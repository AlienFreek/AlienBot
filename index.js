const { Client, Collection } = require('discord.js');
const { token }  = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');


//Create and export audio player
const { createAudioPlayer, NoSubscriberBehavior} = require('@discordjs/voice');

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Play,
  },
});
module.exports = { player };


//TODO: Clean intents, currently has all intents
const client = new Client({ intents: 3276799 });
module.exports = { client };

//Gets all available commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

//Gets all events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


//Check if command is valid and execute
client.on('interactionCreate', async interaction => {
  try {
    await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});



 client.on('messageCreate', async message =>{
   //Outputs info on messages read by the bot
   //console.log(`message received in #${message.guild}(${message.guildId}) by ${message.member.user.tag}(${message.member.user.id})`);

   //Debug for stopping bot within discord (id = me)
   if(message.content === 'stop' && message.member.user.id === '371639278104739841'){
     client.destroy();
   }
 })

//Authorize discord API
void client.login(token);