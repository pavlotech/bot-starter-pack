import { Launch } from './src/telegram/main';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4444;

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
    "token": "",
    "logic": {
      "commands": { "start": { "template": "A" } },
      "tempaltes": {
        "A": { "text": 'KAJFDK', "buttons": ["B1"] },
        "B": { "text": 'DFSDS', "buttons": ["B2"] }
      },
      "buttons": {
        "B1": { "name": 'AHJ', "template": 'B' },
        "B2": { "name": 'dfdfd', "template": 'A' },
      }
    }
  }
}

