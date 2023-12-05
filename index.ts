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
      "tempaltes": {
        "A": { "text": 'KAJFDK', "buttons": ["B1"] },
        "B": { "text": 'DFSDSH', "buttons": ["B2"] },
        "C": { "text": 'IURFVU', "buttons": ["payment"]}
      },
      "buttons": {
        "options": {
          "size": 3
        },
        "B1": { "name": 'kfmvm', "template": 'B' },
        "B2": { "name": 'dfdfd', "template": 'C' },
        "payment": { "name": 'payment', "text": 'оплатить', "template": 'payment' }
      }
    }
  }
}

new Launch(data().token).Telegram(data().logic);