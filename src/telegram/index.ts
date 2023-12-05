import { Telegraf, Scenes, session } from 'telegraf';
import commands from './commands';
import buttons from './buttons';
import handleUrlButton from './handleUrlButton';
import { PaymentHandler } from '../types/payment';

export class Launch {
  dataArray: Map<number, string[][]> = new Map<number, string[][]>();
  readonly token: string;
  bot: any;

  constructor(token: string) {
    this.token = token;
    this.bot = new Telegraf<Scenes.SceneContext>(this.token, { handlerTimeout: 60 * 60 * 1000 });
  }

  async Telegram(logic: any) {
    try {
      this.bot.use(session());
  
      // Setup regular commands
      for (const commandName in logic.commands) {
        const command = logic.commands[commandName];
        this.bot.command(commandName, async (ctx: any) => await commands(ctx, logic, command));
      }
  
      // Setup button actions
      for (const buttonName in logic.buttons) {
        const button = logic.buttons[buttonName];
        const callbackData = button.callback_data || buttonName;
  
        this.bot.action(callbackData, async (ctx: any) => {
          if (button.template === 'payment') {
            // Invoke the PaymentHandler class for 'payment' button
            await new PaymentHandler().handle();
          } else if (button.url) {
            await handleUrlButton(ctx, button);
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