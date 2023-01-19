const { Client, Collection, AttachmentBuilder} = require('discord.js');
const { token }  = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const backup = require('discord-backup');

//TODO: Clean intents
const client = new Client({ intents: 3276799 });
module.exports = { client };

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  //console.log(event)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on('messageCreate', message => {

})

client.on('interactionCreate', async interaction => {
  //console.log(interaction)
  //const command = client.commands.get(interaction.commandName);
  try {
    await client.commands.get(interaction.commandName).execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

void client.login(token);