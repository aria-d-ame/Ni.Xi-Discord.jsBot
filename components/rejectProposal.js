const { Component, ComponentType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');

new Component({
    name: 'rejectProposal',
    type: [ComponentType.BUTTON],
    run: async (ctx) => {
        // Get the user that is proposing
        const proposingUser = ctx.customId.split('-')[1]
        // Get the user that is being proposed to
        const marryingUser = ctx.customId.split('-')[2]
        // Get the time (in ms) at which the component is supposed to expire
        const componentExpiryTime = ctx.customId.split('-')[3]

        // Check if current time has exceeded the time at which component is supposed to expire
        if (Date.now() >= componentExpiryTime) return ctx.reply({ content: "This proposal has expired!", ephemeral: true });

        // Check if user that clicked reject button is anyone except the user being proposed to
        if (ctx.user.id !== marryingUser) return ctx.reply({ content: "This proposal isn't for you!", ephemeral: true })

        // ? REJECT THE PROPOSAL

        // Get proposers and marrying user's server profiles
        try {
            const proposerProfile = await ctx.guild.members.fetch(proposingUser);
            const marryingUserProfile = await ctx.guild.members.fetch(marryingUser)

            // Send confirmation message
            const rejectedProposalEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle(`<:xannounce:1276188470250832014> 𝙼𝙰𝚁𝚁𝚈 <:xannounce:1276188470250832014>`)
                .setDescription(`**«═══✧ ✦ ✧ ✦ ✧═══»**\n${proposerProfile}, ${marryingUserProfile} has rejected your proposal!`)
                .setAuthor({ name: proposerProfile.displayName, iconURL: proposerProfile.displayAvatarURL({ format: 'gif' || 'png', size: 512 }) })
                .setFooter({ text: marryingUserProfile.displayName, iconURL: marryingUserProfile.displayAvatarURL({ format: 'gif' || 'png', size: 512 }) })

            // Update the message that the component is attached to
            await ctx.interaction.update({
                content: null,
                embeds: [rejectedProposalEmbed],
                components: [] // Remove buttons after the proposal is accepted
            });
        } catch (err) {
            console.log(err);
        }
    }
});