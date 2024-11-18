const { Component, ComponentType, customId } = require('gcommands');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const guildSchema = require('../../../schemas/guildSchema');
const countingSchema = require('../../../schemas/countingSchema');

new Component({
  name: 'countChannel',
  type: [ComponentType.BUTTON],

  run: async (ctx) => {
    let guildData = await guildSchema.findOne({ Guild: ctx.guild.id });
    let countingData = await countingSchema.findOne({ Guild: ctx.guild.id });

    const countChannelEmbed = new EmbedBuilder()
    .setDescription('### [ #️⃣ ] Please state which channel you would like Ni.Xi to save as the counting channel.')
    .setColor('#6cc269')
    .setFooter({
      text: `Ni.Xi`,
      iconURL: ctx.client.user.displayAvatarURL({ format: 'gif' || 'png', size: 512 })
    })

    ctx.reply({ embeds: [countChannelEmbed] })

    const filter = (message) => message.author.id === ctx.user.id; 
    const collector = ctx.channel.createMessageCollector({
      filter,
      time: 30000,  
    });

    collector.on('collect', async (message) => {
      const messageSent = message.content
      const channelId = messageSent.replace(/[<>#]/g, "");
      console.log(messageSent, channelId)

      const chosenChannel = ctx.guild.channels.cache.get(channelId);
      
      if (countingData && chosenChannel) {
        await countingSchema.findOneAndUpdate(
          { Guild: ctx.guild.id },
          { Channel: chosenChannel.id },
        );

        await message.reply({ content: `The counting channel has been set to <#${chosenChannel.id}>.`, ephemeral: true });
      } else if (!countingData && chosenChannel){
        await countingSchema.create(
          {
            Guild: ctx.guild.id,
            Channel: chosenChannel.id,
            Number: 1,
            LastUser: null,
            CorrectReaction: '<:accept:1307374279402192987>',
            IncorrectReaction: '<:deny:1307374401209110668>',
            RoleAssignments: null
          }
        )
      } else {
        await message.reply({ content: 'Invalid channel. Please try again.', ephemeral: true });
      };
    });
  }
})