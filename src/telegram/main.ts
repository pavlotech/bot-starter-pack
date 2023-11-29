import { Telegraf, Scenes, session } from 'telegraf';
import commands from './commands'
import buttons from './buttons';

export class Launch {
  readonly token: string;
  bot: any;

  constructor(token: string) {
    this.token = token;
    this.bot = new Telegraf<Scenes.SceneContext>(this.token, { handlerTimeout: 60 * 60 * 1000 });
  }

  async Telegram(logic: any) {
    console.log(logic);
    try {
      this.bot.use(session());
  
      // Создание команд и обработчиков на основе данных из logic
      for (const commandName in logic.commands) {
        const command = logic.commands[commandName];
        this.bot.command(commandName, async (ctx: any) => await commands(ctx, logic, command));
      }
      // Создание обработчика для кнопок
      for (const buttonName in logic.buttons) {
        const button = logic.buttons[buttonName];
        this.bot.action(buttonName, async (ctx: any) => {
          if (button.url) {
            await ctx.editMessageText(button.name, {
              reply_markup: {
                inline_keyboard: [
                  [{ text: 'Ссылка', url: button.url }],
                ],
              },
            });
          } else {
            await buttons(ctx, logic, button);
          }
        });
      }
  
      this.bot.launch();
      console.log('[BOT] Started');
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }
  }  
}
