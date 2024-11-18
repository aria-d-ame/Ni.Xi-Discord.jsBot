const { Component, ComponentType, customId } = require('gcommands');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const guildSchema = require('../../../schemas/guildSchema');
const countingData = require('../../../schemas/countingSchema');

new Component({
  name: 'countingSetup',
  type: [ComponentType.BUTTON],

  run: async (ctx) => {
    let guildData = await guildSchema.findOne({ Guild: ctx.guild.id });

    const countSettingsEmbed = new EmbedBuilder()
    .setDescription('### [ #️⃣ ] Here are your counting settings for Ni.Xi! What would you like to edit?')
    .setColor('#6cc269')
    .setFooter({
      text: `Ni.Xi`,
      iconURL: ctx.client.user.displayAvatarURL({ format: 'gif' || 'png', size: 512 })
    })

  const componentsExpiryTime = Date.now() + 60000;

  const channelButton = new ButtonBuilder()
    .setCustomId(customId('countChannel', componentsExpiryTime))
    .setLabel('Channel')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('📬');

  const reactionButton = new ButtonBuilder()
    .setCustomId(customId('countReaction', componentsExpiryTime))
    .setLabel('Reaction')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('✅');

  const togglesButton = new ButtonBuilder()
    .setCustomId(customId('countToggles', componentsExpiryTime))
    .setLabel('Toggles')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🔘');

  const countButtons = new ActionRowBuilder()
    .addComponents(channelButton, reactionButton, togglesButton);

    if (!guildData) {
      guildData = await guildSchema.create({
        Guild: ctx.guild.id,
        Count: 0,
        Leveling: 0,
        Currency: 0,
        Suggestions: 0,
        Moderation: 0,
        Logging: 0,
        BumpReminder: 0,
        Welcome: 0,
        Leave: 0,
      })
    }

    if (guildData.Count === 0) {
      const countSetupEmbed = new EmbedBuilder()
      .setDescription('### [ #️⃣ ] Your server does not currently have counting settings for Ni.Xi. Would you like to create them now?')
      .setColor('#6cc269')
      .setFooter({
        text: `Ni.Xi`,
        iconURL: ctx.client.user.displayAvatarURL({ format: 'gif' || 'png', size: 512 })
      })

      const askMessage = await ctx.reply({
        embeds: [countSetupEmbed],
        fetchReply: true
      });

      const accept = '1307374279402192987';
      const deny = '1307374401209110668';
      await askMessage.react(accept);
      await askMessage.react(deny);

      const filter = (reaction, user) => {
        return [accept, deny].includes(reaction.emoji.id) && user.id !== askMessage.author.id;
      };

      const collector = askMessage.createReactionCollector({ filter, time: 60000 }); // 1-minute timeout

      collector.on('collect', (reaction, user) => {
        if (reaction.emoji.id === accept) {
          ctx.editReply({
            embeds: [countSettingsEmbed],
            components: [countButtons],
          });
        } else if (reaction.emoji.id === deny) {
          ctx.editReply({
            content: `Counting settings for Ni.Xi will not be created.`,
          });
        }
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          ctx.editReply({
            content: 'No reactions collected! Cancelling setup...',
            ephemeral: true,
          });
        }
      });
    }

    if (guildData.Count === 1) {
  
      await ctx.reply({
        embeds: [countSettingsEmbed],
        components: [countButtons],
        fetchReply: true
      });
    }
  }
})