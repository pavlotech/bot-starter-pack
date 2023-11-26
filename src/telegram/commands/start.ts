//import translate from '../../storage/localization';
import { Context } from 'telegraf';

export default async function start (ctx: Context) {
  try {
    await ctx.reply(`*start*`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: `Получить сообщение`, callback_data: 'get_message' }]
        ]
      },
      parse_mode: 'Markdown'
    })
    console.log(`[START] ${ctx.from?.username}`);
  } catch (error) { console.log(`[ERROR] ${error}`) }
}