//import translate from '../../storage/localization';
import { Context } from 'telegraf';

export default async function help (ctx: Context) {
  try {
    await ctx.reply(`*help*`, { parse_mode: 'Markdown' });
    console.log(`[HELP] ${ctx.from?.username}`);
  } catch (error) { console.log(`[ERROR] ${error}`) }
}