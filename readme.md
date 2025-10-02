# Discord Weather Bot

A Discord bot that provides weather information using OpenWeatherMap and WeatherAPI.com. The bot can fetch current weather, 3-day forecasts, and 7-day weather history for a given city. This is my first attempt at creating a Discord bot using JavaScript and the discord.js library.

## Features

- **OpenWeatherMap Integration**:
  - Get current weather for a city using the `!ow` command.
- **WeatherAPI.com Integration**:
  - Get current weather for a city using the `!wa` command.
  - Get a 3-day weather forecast using the `!wa forecast` command.
  - Get a 7-day weather history using the `!wa history` command.

## Prerequisites

- Node.js (v18 or higher)
- A Discord bot token
- API keys for:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [WeatherAPI.com](https://www.weatherapi.com/)

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
   ```

4. Start the bot:
   ```bash
   node index.js
   ```

## Commands

### OpenWeatherMap Commands
- `!ow <city>`: Fetches the current weather for the specified city.
  - Example: `!ow London`

### WeatherAPI.com Commands
- `!wa <city>`: Fetches the current weather for the specified city.
  - Example: `!wa Paris`
- `!wa forecast <city>`: Fetches a 3-day weather forecast for the specified city.
  - Example: `!wa forecast Tokyo`
- `!wa history <city>`: Fetches the 7-day weather history for the specified city.
  - Example: `!wa history New York`

## Example Output

### Current Weather (`!ow London`)
```
Weather in London
Condition: Clear Sky
🌡️ Temperature: 15°C
💧 Humidity: 60%
```

### 3-Day Forecast (`!wa forecast Tokyo`)
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

### 7-Day History (`!wa history New York`)
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
