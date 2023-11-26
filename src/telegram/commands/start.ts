//import translate from '../../storage/localization';
import { Context } from 'telegraf';

export default async function start (ctx: Context) {
  try {
    await ctx.reply(`*start*`, { parse_mode: 'Markdown' })
    console.log(`[START] ${ctx.from?.username}`)
  } catch (error) { console.log(`[ERROR] ${error}`) }
}