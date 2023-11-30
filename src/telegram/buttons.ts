import isEqual from 'lodash/isEqual';

export default async function buttons(ctx: any, logic: any, button: any, previousButton?: any) {
  const template = logic.tempaltes[button.template || button.url];

  const inlineKeyboard = [
    template.buttons.map((btnName: string) => ({
      text: logic.buttons[btnName].name,
      callback_data: btnName,
    })),
    previousButton
      ? [{ text: 'Back', callback_data: 'back', previousButtonData: previousButton }]
      : [{ text: 'Back', callback_data: 'back' }],
  ];

  // Check if the content is different before attempting to edit
  if (ctx.update.callback_query.message.text !== template.text || !isEqual(ctx.update.callback_query.message.reply_markup.inline_keyboard, inlineKeyboard)) {
    await ctx.editMessageText(template.text, {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
      },
    });
  }
}