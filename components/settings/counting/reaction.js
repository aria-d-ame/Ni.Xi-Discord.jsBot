const { Component, ComponentType, customId } = require('gcommands');
const { EmbedBuillder } = require('discord.js');
const guildSchema = require('../../../schemas/guildSchema');
const countingSchema = require('../../../schemas/countingSchema');

new Component({
  name: 'countReaction',
  type: [ComponentType.BUTTON],

  run: async (ctx) => {
    let guildData = await guildSchema.findOne({ Guild: ctx.guild.id });
    let countingData = await countingSchema.findOne({ Guild: ctx.guild.id });

    if (!countingData) {
      return ctx.reply({ content: 'Please pick a counting channel first!', ephemeral: true });
    }

    
  }
})