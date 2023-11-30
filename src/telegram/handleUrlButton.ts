export default async function handleUrlButton(ctx: any, button: any) {
  await ctx.editMessageText(button.name, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Ссылка', url: button.url }],
      ],
    },
  });
}