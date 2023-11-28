import express from 'express';
import bodyParser from 'body-parser';
import { Launch } from './src/telegram/main';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/processData', (req, res) => {
  const { token, commands } = req.body;
  console.log(commands)
  
  // Создаем экземпляр класса Launch и вызываем метод Telegram с новым параметром
  new Launch(token).Telegram(commands);
  
  res.json({ message: 'Data received successfully', token, commands });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});