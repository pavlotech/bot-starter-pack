import { client } from '../db/postgres';

export default async function commands(ctx: any, logic: any, command: any) {
  const template = logic.templates[command.template];
  
  const userId = ctx.from.id;
  const botId = ctx.botInfo.id;
  //await saveIdsToPostgres(userId, botId);

  await ctx.reply(template.text, {
    reply_markup: {
      inline_keyboard: [
        template.buttons.map((btnName: string) => ({
          text: logic.buttons[btnName].text,
          callback_data: btnName,
        })),
      ],
    },
  });
}

async function saveIdsToPostgres(userId: number, botId: string) {
  try {
    const query = 'INSERT INTO user_table (user_id, bot_id) VALUES ($1, $2)';
    const values = [userId, botId];
    await client.query(query, values);
  } catch (error) {
    console.error('Error saving IDs to PostgreSQL:', error);
  }
}