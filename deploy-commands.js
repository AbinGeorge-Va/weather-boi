const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const token = process.env.token;
const clientId = process.env.CLIENT_ID; // Add your bot's client ID to your .env file
const guildId = process.env.GUILD_ID;   // Add your server's ID to your .env file for testing

const commands = [
    new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get weather information from various sources.')
        .addSubcommandGroup(group =>
            group
                .setName('openweathermap')
                .setDescription('Get weather from OpenWeatherMap.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('current')
                        .setDescription('Get the current weather.')
                        .addStringOption(option => 
                            option.setName('city')
                                .setDescription('The city to get weather for')
                                .setRequired(true))
                )
        )
        .addSubcommandGroup(group =>
            group
                .setName('weatherapi')
                .setDescription('Get weather from WeatherAPI.com.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('current')
                        .setDescription('Get the current weather.')
                        .addStringOption(option => 
                            option.setName('city')
                                .setDescription('The city to get weather for')
                                .setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('forecast')
                        .setDescription('Get a 3-day weather forecast.')
                        .addStringOption(option => 
                            option.setName('city')
                                .setDescription('The city to get the forecast for')
                                .setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('history')
                        .setDescription('Get the weather history for the last 7 days.')
                        .addStringOption(option => 
                            option.setName('city')
                                .setDescription('The city to get history for')
                                .setRequired(true))
                )
        ),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // The put method is used to fully refresh all commands in the guild with the current set
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();