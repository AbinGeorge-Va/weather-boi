require('dotenv').config();

const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (msg.author.bot) return;

    // --- Command for OpenWeatherMap ---
    if (msg.content.startsWith('!ow')) {
        const city = msg.content.split(' ').slice(1).join(' ');
        if (!city) return msg.reply('Please provide a city name. (e.g., `!ow Kottayam`)');

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
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
                .setTimestamp()
                .setFooter({ text: 'Powered by OpenWeatherMap' });
            msg.channel.send({ embeds: [embed] });
        } catch (error) {
            msg.reply(`Sorry, I couldn't find the weather for "${city}" using OpenWeatherMap.`);
        }
    }

    // --- Command Router for WeatherAPI.com ---
    else if (msg.content.startsWith('!wa')) {
        const args = msg.content.split(' ').slice(1);
        const subCommand = args[0];
        const apiKey = process.env.WEATHERAPI_API_KEY;

        // --- Sub-command: !wa forecast ---
        if (subCommand === 'forecast') {
            const city = args.slice(1).join(' ');
            if (!city) return msg.reply('Usage: `!wa forecast <city>`');
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

            try {
                const response = await axios.get(url);
                const data = response.data;
                const embed = new EmbedBuilder()
                    .setColor(0x32a852)
                    .setTitle(`3-Day Forecast for ${data.location.name}`);
                data.forecast.forecastday.forEach(day => {
                    embed.addFields({
                        name: `🗓️ ${day.date}`,
                        value: `**${day.day.condition.text}**\n📈 High: ${day.day.maxtemp_c}°C\n📉 Low: ${day.day.mintemp_c}°C`
                    });
                });
                embed.setFooter({ text: 'Powered by WeatherAPI.com' });
                msg.channel.send({ embeds: [embed] });
            } catch (error) { msg.reply(`Could not find a forecast for "${city}".`); }
        }

        // --- Sub-command: !wa history ---
        else if (subCommand === 'history') {
            const city = args.slice(1).join(' ');
            if (!city) return msg.reply('Usage: `!wa history <city>`');

            try {
                // Create an array of promises for the last 7 days
                const promises = [];
                for (let i = 1; i <= 7; i++) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
                    const url = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&dt=${dateString}`;
                    promises.push(axios.get(url));
                }
                
                // Wait for all API calls to complete
                const results = await Promise.all(promises);

                const embed = new EmbedBuilder()
                    .setColor(0x32a852)
                    .setTitle(`Last 7 Days of Weather History for ${city}`);
                
                results.forEach(response => {
                    const day = response.data.forecast.forecastday[0];
                    embed.addFields({
                        name: `🗓️ ${day.date}`,
                        value: `Avg: **${day.day.avgtemp_c}°C** (High: ${day.day.maxtemp_c}°C, Low: ${day.day.mintemp_c}°C)`
                    });
                });
                
                embed.setFooter({ text: 'Powered by WeatherAPI.com' });
                msg.channel.send({ embeds: [embed] });
            } catch (error) { msg.reply(`Could not find the 7-day history for "${city}".`); }
        }

        else {
            const city = args.join(' ');
            if (!city) return msg.reply('Usage: `!wa <city>` or `!wa forecast <city>` or `!wa history <city>`');
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

            try {
                const response = await axios.get(url);
                const data = response.data;
                const embed = new EmbedBuilder()
                    .setColor(0x32a852)
                    .setTitle(`Current Weather in ${data.location.name}`)
                    .setThumbnail(`https:${data.current.condition.icon}`)
                    .addFields(
                        { name: 'Condition', value: `${data.current.condition.text}`, inline: true },
                        { name: '🌡️ Temperature', value: `${data.current.temp_c}°C`, inline: true },
                        { name: '💧 Humidity', value: `${data.current.humidity}%`, inline: true }
                    )
                    .setTimestamp().setFooter({ text: 'Powered by WeatherAPI.com' });
                msg.channel.send({ embeds: [embed] });
            } catch (error) { msg.reply(`Could not find current weather for "${city}".`); }
        }
    }
});

client.login(process.env.token);