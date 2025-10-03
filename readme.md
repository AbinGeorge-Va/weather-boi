# Discord Weather Bot

A Discord bot that provides weather information using OpenWeatherMap and WeatherAPI.com. The bot can fetch current weather, 3-day forecasts, and 7-day weather history for a given city. This is my first attempt at creating a Discord bot using JavaScript and the discord.js library.

## Features

- **Slash Commands** for weather queries (no prefix needed, just `/weather ...`)
- **OpenWeatherMap Integration**:
  - Get current weather for a city.
- **WeatherAPI.com Integration**:
  - Get current weather for a city.
  - Get a 3-day weather forecast.
  - Get a 7-day weather history.

## Prerequisites

- Node.js (v18 or higher)
- A Discord bot token
- API keys for:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [WeatherAPI.com](https://www.weatherapi.com/)
- Your Discord application's **Client ID** and your test server's **Guild ID** (for slash command deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/discord-weather-bot.git
   cd discord-weather-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   token=YOUR_DISCORD_BOT_TOKEN
   OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
   WEATHERAPI_API_KEY=YOUR_WEATHERAPI_API_KEY
   CLIENT_ID=YOUR_DISCORD_CLIENT_ID
   GUILD_ID=YOUR_TEST_GUILD_ID
   ```

4. Deploy the slash commands to your server:
   ```bash
   node deploy-commands.js
   ```

5. Start the bot:
   ```bash
   node main.js
   ```

## Usage

Use the `/weather` slash command in your Discord server. The command supports the following options:

### OpenWeatherMap
- `/weather openweathermap current city:<city>`  
  Get the current weather for a city using OpenWeatherMap.

### WeatherAPI.com
- `/weather weatherapi current city:<city>`  
  Get the current weather for a city using WeatherAPI.com.
- `/weather weatherapi forecast city:<city>`  
  Get a 3-day weather forecast for a city.
- `/weather weatherapi history city:<city>`  
  Get the 7-day weather history for a city.

## Example Output

### Current Weather (OpenWeatherMap)
```
Weather in London
Condition: Clear Sky
🌡️ Temperature: 15°C
💧 Humidity: 60%
```

### 3-Day Forecast (WeatherAPI.com)
```
3-Day Forecast for Tokyo
🗓️ 2025-10-01: Clear Sky
📈 High: 25°C
📉 Low: 18°C
🗓️ 2025-10-02: Partly Cloudy
📈 High: 22°C
📉 Low: 16°C
🗓️ 2025-10-03: Rain
📈 High: 20°C
📉 Low: 15°C
```

### 7-Day History (WeatherAPI.com)
```
Last 7 Days of Weather History for New York
🗓️ 2025-09-25: Avg: 18°C (High: 22°C, Low: 14°C)
🗓️ 2025-09-26: Avg: 19°C (High: 23°C, Low: 15°C)
...
```

## Troubleshooting

- **Bot not starting**:
  - Ensure your `.env` file is correctly configured.
  - Check that your Node.js version is 18 or higher.
- **Slash commands not appearing**:
  - Make sure you ran `node deploy-commands.js` and used the correct `CLIENT_ID` and `GUILD_ID`.
  - It may take a minute for Discord to update the commands.
- **Bot not responding to commands**:
  - Ensure the bot has the necessary permissions in your Discord server.
  - Check the logs for any errors.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Discord.js](https://discord.js.org/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [WeatherAPI.com](https://www.weatherapi.com/)

---

*This README file was created with the help of GitHub Copilot.*
