require('dotenv').config();
const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // We no longer need MessageContent for slash commands
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    // Best practice: defer the reply to prevent timeout
    await interaction.deferReply();

    const { commandName, options } = interaction;

    if (commandName === 'weather') {
        const group = options.getSubcommandGroup();
        const subcommand = options.getSubcommand();
        const city = options.getString('city');
        const apiKey = group === 'openweathermap' ? process.env.OPENWEATHER_API_KEY : process.env.WEATHERAPI_API_KEY;

        try {
            if (group === 'openweathermap') {
                if (subcommand === 'current') {
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                    const response = await axios.get(url);
                    const data = response.data;
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(`Weather in ${data.name}`)
                        .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                        .addFields(
                            { name: 'Condition', value: `${data.weather[0].description}`, inline: true },
                            { name: '🌡️ Temperature', value: `${data.main.temp}°C`, inline: true },
                            { name: '💧 Humidity', value: `${data.main.humidity}%`, inline: true }
                        )
                        .setTimestamp().setFooter({ text: 'Powered by OpenWeatherMap' });
                    await interaction.editReply({ embeds: [embed] });
                }
            } else if (group === 'weatherapi') {
                if (subcommand === 'current') {
                    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
                    const response = await axios.get(url);
                    const data = response.data;
                    const embed = new EmbedBuilder()
                        .setColor(0x32a852).setTitle(`Current Weather in ${data.location.name}`)
                        .setThumbnail(`https:${data.current.condition.icon}`)
                        .addFields(
                            { name: 'Condition', value: `${data.current.condition.text}`, inline: true },
                            { name: '🌡️ Temperature', value: `${data.current.temp_c}°C`, inline: true },
                            { name: '💧 Humidity', value: `${data.current.humidity}%`, inline: true }
                        )
                        .setTimestamp().setFooter({ text: 'Powered by WeatherAPI.com' });
                    await interaction.editReply({ embeds: [embed] });
                } else if (subcommand === 'forecast') {
                    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
                    const response = await axios.get(url);
                    const data = response.data;
                    const embed = new EmbedBuilder().setColor(0x32a852).setTitle(`3-Day Forecast for ${data.location.name}`);
                    data.forecast.forecastday.forEach(day => {
                        embed.addFields({
                            name: `🗓️ ${day.date}`,
                            value: `**${day.day.condition.text}**\n📈 High: ${day.day.maxtemp_c}°C\n📉 Low: ${day.day.mintemp_c}°C`
                        });
                    });
                    embed.setFooter({ text: 'Powered by WeatherAPI.com' });
                    await interaction.editReply({ embeds: [embed] });
                } else if (subcommand === 'history') {
                    const promises = [];
                    for (let i = 1; i <= 7; i++) {
                        const date = new Date(); date.setDate(date.getDate() - i);
                        const dateString = date.toISOString().split('T')[0];
                        const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${dateString}`;
                        promises.push(axios.get(url));
                    }
                    const results = await Promise.all(promises);
                    const embed = new EmbedBuilder().setColor(0x32a852).setTitle(`Last 7 Days of Weather History for ${city}`);
                    results.forEach(response => {
                        const day = response.data.forecast.forecastday[0];
                        embed.addFields({ name: `🗓️ ${day.date}`, value: `Avg: **${day.day.avgtemp_c}°C** (High: ${day.day.maxtemp_c}°C, Low: ${day.day.mintemp_c}°C)`});
                    });
                    embed.setFooter({ text: 'Powered by WeatherAPI.com' });
                    await interaction.editReply({ embeds: [embed] });
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: `Sorry, I couldn't fetch the data for "${city}". Please check the city name.`, ephemeral: true });
        }
    }
});

client.login(process.env.token);