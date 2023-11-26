//import translate from '../../storage/localization';
import { Context } from 'telegraf';

export default async function command (ctx: Context) {
  try {
    console.log(`[HELP] ${ctx.from?.username}`)
    await ctx.reply(`help`, { parse_mode: 'Markdown' });
  } catch (error) { console.log(`[ERROR] ${error}`) }
}