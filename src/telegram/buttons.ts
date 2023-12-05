export default async function buttons(ctx: any, logic: any, button: any) {
  const template = logic.tempaltes[button.template];
  const buttonsData = template.buttons.map((btnName: string) => ({
    text: logic.buttons[btnName].name,
    callback_data: btnName,
  }));

  const inlineKeyboard = [];
  for (let i = 0; i < buttonsData.length; i += logic.buttons.options.size) {
    const row = buttonsData.slice(i, i + logic.buttons.options.size);
    inlineKeyboard.push(row);
  }
  await ctx.editMessageText(template.text, {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  });
}