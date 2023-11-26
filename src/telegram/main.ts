import { Telegraf, Scenes, session } from 'telegraf';
import dotenv from 'dotenv'; dotenv.config()
import start from './commands/start';
import help from './commands/help';
import message from './events/message';
import command from './commands/command';

export class Launch {
  bot: any = new Telegraf<Scenes.SceneContext>(process.env.TG_TOKEN || '', { handlerTimeout: 60 * 60 * 1000 });
  async Telegram () {
    try {
/*       const scene = new Scene()
      const stage = new Scenes.Stage<Scenes.SceneContext>([
        scene.firstDate(),
        scene.secondDate(),
        scene.getName(),
      ], { ttl: 10 * 60 * 1000 }); */
      this.bot.use(session());
      //this.bot.use(stage.middleware());

      this.bot.start(start);
      this.bot.command('command', command);
      this.bot.command('help', help);

      this.bot.use(message)
      this.bot.launch();

      console.log('[BOT] Started')
    } catch (error) { console.log(`[ERROR] ${error}`)  }
  }
}