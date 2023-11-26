import { Context } from "telegraf";

export default async function get_url (ctx: Context) {
  try {
    await ctx.reply('*get_url*', {
      reply_markup: {
        inline_keyboard: [
          [{ text: `Ссылка`, url: 'https://google.com' }]
        ]
      },
      parse_mode: 'Markdown'
    })
  } catch (error) { console.error('[GET_URL]', error) }
}