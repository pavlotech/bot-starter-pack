import translate from '../../storage/localization/index';
import { TTScraper } from "../../tiktok/src/main";
import { Context } from 'telegraf';

export default async function message(ctx: Context, next: Function) {
  try {
    if (ctx.message === undefined) return next();
    if (!('text' in ctx.message)) return next();

    const TikTokScraper = new TTScraper();

    // Регулярное выражение для ссылок на TikTok
    let tiktokRegex = /^https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/\d+$/;

    // Проверка, является ли текст ссылкой на TikTok
    if (tiktokRegex.test(ctx.message.text)) {
      const noWaterMark = await TikTokScraper.noWaterMark(ctx.message.text);
      await ctx.replyWithVideo({ url: noWaterMark || '' });
    }
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    await ctx.reply(`*${translate(ctx.message?.from.language_code || '').error.error}*`, { parse_mode: 'Markdown' });
  }
}


