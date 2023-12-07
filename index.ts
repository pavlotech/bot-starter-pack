import { Launch } from './src/telegram';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.argv.includes('--port') ? parseInt(process.argv[process.argv.indexOf('--port') + 1], 10) : 4444;

app.use(bodyParser.json());

app.post('/processData', (req, res) => {
  const { token, logic } = req.body;
  console.log(logic);
  new Launch(data().token).Telegram(data().logic);      
  res.json({ message: 'Data received successfully', token, logic });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const data = () => {
  return {
    "token": "5822047247:AAEp69GIA5oMf1FMaPPEb7v5Ko2jILBBfKI",
    "logic": {
      "commands": { "start": { "template": "A" } },
      "templates": {
        "A": { "text": "МАГАЗИН", "buttons": ["B1"] },
        "B": { "text": "ТОВАРЫ", "buttons": ["B2"] },
        "C": { "text": "КУПИТЬ ПИВО", "buttons": ["VFL", "TO-SHOP"]}
      },
      "buttons": {
        "B1": { "type": "btn", "text": "ПОСМОРЕТЬ ТОВАРЫ", "template": "B" },
        "B2": { "type": "btn", "text": "ПИВО", "template": "C" },
        "VFL": { "type": "payment", "service": "paypal", "price": 12, "text": "ОПЛАТИТЬ - 12$", "template": "payment" },
        "TO-SHOP": {"type": "btn", "text": "НАЗАД", "template": "A"}
      }
    }
  }
}

new Launch(data().token).Telegram(data().logic);