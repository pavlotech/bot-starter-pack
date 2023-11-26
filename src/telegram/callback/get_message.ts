import { Context } from "telegraf";

export default async function get_message (ctx: Context) {
  try {
    await ctx.reply('*get_message*', {
      reply_markup: {
        inline_keyboard: [
          [{ text: `Получить ссылку`, callback_data: 'get_url' }]
        ]
      },
      parse_mode: 'Markdown'
    })
  } catch (error) { console.error('[GET_MESSAGE]', error) }
}