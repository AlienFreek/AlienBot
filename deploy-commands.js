/*
SCRIPT PROVIDED BY THE DISCORD.JS TEAM
Updates the bots available commands on discord's end (local automatically updates on launch)

For some reason, attempting to run this script while a command includes a variable from index.js
results in an error. Instead of figuring out the error, I just comment out the require(index.js)
for each command when re-deploying.
 */

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { token, clientId } = require('./config.json');
const fs = require('node:fs');
//const path = require('node:path');

const commands = [];
//const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();