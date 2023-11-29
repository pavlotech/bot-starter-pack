export default async function buttons (ctx: any, logic: any, button: any) {
  const template = logic.tempaltes[button.template || button.url];  // Fix the typo here
  await ctx.editMessageText(template.text, {
    reply_markup: {
      inline_keyboard: [
        template.buttons.map((btnName: string) => ({
          text: logic.buttons[btnName].name,
          callback_data: btnName,
        })),
        [{ text: 'Back', callback_data: 'back' }]
      ],
    },
  });
}