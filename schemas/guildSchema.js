const { model, Schema } = require('mongoose');

let guildSettings = new Schema({
  Guild: String,
  Count: Number,
  Leveling: Number,
  Currency: Number,
  Suggestions: Number,
  Moderation: Number,
  Logging: Number,
  BumpReminder: Number,
  Welcome: Number,
  Leave: Number,
})

module.exports = model('guildSettings', guildSettings);