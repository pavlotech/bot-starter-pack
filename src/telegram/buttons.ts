export default async function buttons(ctx: any, logic: any, button: any) {
  const template = logic.templates[button.template];
  const buttonsData = template.buttons.map((btnName: string) => ({
    text: logic.buttons[btnName].text,
    callback_data: btnName,
  }));

  await ctx.editMessageText(template.text, {
    reply_markup: {
      inline_keyboard: [buttonsData],
    },
  });
}
