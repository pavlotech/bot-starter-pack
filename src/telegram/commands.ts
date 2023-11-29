export default async function commands (ctx: any, logic: any, command: any) {
  const template = logic.tempaltes[command.template];  // Fix the typo here
  await ctx.reply(template.text, {
    reply_markup: {
      inline_keyboard: [
        template.buttons.map((buttonName: string) => ({
          text: logic.buttons[buttonName].name,
          callback_data: buttonName,
        })),
      ],
    },
  });
}
