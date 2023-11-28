import { Telegraf, Scenes, session } from 'telegraf';
import dotenv from 'dotenv';import buttonCallback from './buttons/callback';
import commandCallback from './commands/callback';
import Command from '../interfaces/commands';
dotenv.config()

export class Launch {
  readonly token: string;
  bot: any;

  constructor(token: string) {
    this.token = token;
    this.bot = new Telegraf<Scenes.SceneContext>(this.token, { handlerTimeout: 60 * 60 * 1000 });
  }
  
  async Telegram(commands: Command[]) {
    try {
      this.bot.use(session());
  
      for (const command of commands) {
        this.bot.command(command.name, (ctx: any) => commandCallback(ctx, command.response));
      }
  
      this.bot.action(`action`, buttonCallback);
  
      this.bot.launch();
  
      console.log('[BOT] Started');
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }
  }
}