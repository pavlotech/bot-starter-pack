import { Telegraf, Scenes, session } from 'telegraf';
import commands from './commands';
import buttons from './buttons';
import handleUrlButton from './handleUrlButton';
import { PaymentHandler } from '../types/payment';
import { loadavg } from 'os';

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

      for (const commandName in logic.commands) {
        const command = logic.commands[commandName];
        this.bot.command(commandName, async (ctx: any) => await commands(ctx, logic, command));
      }
      for (const buttonName in logic.buttons) {
        const button = logic.buttons[buttonName];
        const paymentData = {
          service: button.service,
          price: button.price,
        };
        this.bot.action(buttonName, async (ctx: any) => {
          if (button.type == 'btn') await buttons(ctx, logic, button)
          if (button.type == 'payment') await new PaymentHandler().handle(paymentData);
        });
      }

      this.bot.launch();
      console.log('[BOT] Started');
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }
  }
}