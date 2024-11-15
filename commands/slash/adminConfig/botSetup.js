const { Command, CommandType } = require('gcommands');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } = require('discord.js');

new Command({
  name: 'initial-setup',
  description: 'Please use this command first! (Administrator permissions required)',
  type: [CommandType.SLASH],

  run: async (ctx) => {

  }
})