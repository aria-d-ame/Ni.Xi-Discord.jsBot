const { Command, CommandType, customId } = require('gcommands');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ActionRowBuilder } = require('discord.js');

// Initial setup of the bot, use buttons to set const channels, settings on/off, etc.
// ! Components currently not functional

new Command({
  name: 'setup',
  description: 'Please use this command first! (Administrator permissions required)',
  type: [CommandType.SLASH],

  run: async (ctx) => {
    // Deny access to command if user is not an Administator
    if (!ctx.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await ctx.interaction.reply({ content: `You don't have permissions to do this! (Administator Required)`, ephermal: true })

    // The embed that will be sent when command is run.
    const setupEmbed = new EmbedBuilder()
      .setDescription('## [ 🌿 ] Welcome to Ni.Xi setup!\n\n### Use the buttons below to pick your settings!\n\n**Please join the support server if you have any questions or feedback!** https://discord.gg/MTYEjW3MJA')
      .setColor('#6cc269')
      .setFooter({
        text: `Ni.Xi`,
        iconURL: ctx.client.user.displayAvatarURL({ format: 'gif' || 'png', size: 512 })
      })

    // Unix timestamp at which the components will expire
    const componentsExpiryTime = Date.now() + 60000;

    const countingButton = new ButtonBuilder()
      .setCustomId(customId('countingSetup', componentsExpiryTime))
      .setLabel('Counting')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('#️⃣');

    const levelingButton = new ButtonBuilder()
      .setCustomId(customId('levelingSetup', componentsExpiryTime))
      .setLabel('Leveling & Currency')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('🪙');

    const suggestButton = new ButtonBuilder()
      .setCustomId(customId('suggestSetup', componentsExpiryTime))
      .setLabel('Suggestions & Confessions')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('💡');

    const moderationButton = new ButtonBuilder()
      .setCustomId(customId('moderationSetup', componentsExpiryTime))
      .setLabel('Moderation & Logging')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('🛡️');
    
    const bumpButton = new ButtonBuilder()
      .setCustomId(customId('bumpSetup', componentsExpiryTime))
      .setLabel('Bump Reminders')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('🔔');

    const welcomeButton = new ButtonBuilder()
      .setCustomId(customId('welcomeSetup', componentsExpiryTime))
      .setLabel('Welcome & Leave Messages')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('📬');

    const setupButtons = new ActionRowBuilder()
      .addComponents(countingButton, levelingButton, suggestButton);

    const setupButtons2 = new ActionRowBuilder()
      .addComponents(moderationButton, bumpButton, welcomeButton);

    await ctx.reply({
      embeds: [setupEmbed],
      components: [setupButtons, setupButtons2],
      ephemeral: false,
      fetchReply: true
    });
  }
})