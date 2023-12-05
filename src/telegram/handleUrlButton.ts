export default async function handleUrlButton(ctx: any, button: any) {
  const buttonText = button.text || 'Ссылка'; // Use the provided text or a default value
  await ctx.editMessageText(button.name, {
    reply_markup: {
      inline_keyboard: [
        [{ text: buttonText, url: button.url }],
      ],
    },
  });
}
