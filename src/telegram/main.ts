import { Telegraf, Scenes, session } from 'telegraf';
import commands from './commands';
import buttons from './buttons';
import handleUrlButton from './handleUrlButton';

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

      // Создание команд и обработчиков на основе данных из logic
      for (const commandName in logic.commands) {
        const command = logic.commands[commandName];
        this.bot.command(commandName, async (ctx: any) => await commands(ctx, logic, command));
      }

      // Создание обработчика для кнопок
      for (const buttonName in logic.buttons) {
        const button = logic.buttons[buttonName];
        this.bot.action(buttonName, async (ctx: any) => {
          const userId = ctx.from.id;
          const dataForButton = getDataForButton(logic, buttonName, ctx);

          if (button.url) {
            await handleUrlButton(ctx, button);
          } else {
            const previousData = this.dataArray.get(userId) || [];
            await buttons(ctx, logic, button, previousData);

            // Store the current data in the dataArray
            this.dataArray.set(userId, [...previousData, dataForButton]);
          }
        });
      }

      // Добавляем обработчик для кнопки "Back"
      this.bot.action("back", async (ctx: any) => {
        const userId = ctx?.from?.id;
        const previousButtonData = this.dataArray.get(userId) || [];
        const lastPreviousButtonData = previousButtonData.pop(); // Remove the last stored data

        // Check if ctx and ctx.editMessageText are defined before using them
        if (lastPreviousButtonData && ctx && ctx.editMessageText) {
          await buttons(ctx, logic, lastPreviousButtonData);

          // Update the dataArray without the last data
          this.dataArray.set(userId, previousButtonData);
        }
      });

      this.bot.launch();
      console.log('[BOT] Started');
    } catch (error) {
      console.log(`[ERROR] ${error}`);
    }

    function getDataForButton(logic: any, buttonName: string, ctx: any): string[] {
      return logic.buttons[buttonName];
    }
  }
}