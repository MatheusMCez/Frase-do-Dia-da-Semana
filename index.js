import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let dayOfWeek = "";
let dayTime = "";

function dayOfTheWeekAdvice (req, res, next) {
  const d = new Date();
  let day = d.getDay();
  let time = d.getHours();

  if (time >= 0 && time < 6) {
    dayTime = "Boa madrugada";
  } else if (time >= 6 && time < 12) {
      dayTime = "Bom dia";
    } else if (time >= 12 && time < 18) {
      dayTime = "Boa tarde";
    } else if (time >= 18 && time <= 23){
      dayTime = "Boa noite"
    } else {
      console.log(`Something went wrong: ${dayTime}`)
    }
 
  switch (day) {
    case 0:
      dayOfWeek = "Domingo, dia de descansar e aproveitar, a semana já vai começar!";
      break;

    case 1:
      dayOfWeek = "Segunda-Feira, primeiro dia de trabalho, nada de preguiça!!";
      break;

    case 2:
      dayOfWeek = "Terça-Feira, essa semana vai longe ainda!!!";
      break;

    case 3:
      dayOfWeek = "Quarta-Feira, já estamos na metade!!!!";
      break;

    case 4:
      dayOfWeek = "Quinta-Feira, falta pouco pra acabar essa semana!!!!!";
      break;

    case 5:
      dayOfWeek = "Sexta-Feira, SEXTOU, graças a Deus!!!!!!";
      break;

    case 6:
      dayOfWeek = "Sabado, dia de churrasco!!!!!!!";
      break;

    default:
      console.log("Something is missing! ")
      break;
  }

  next();
}

app.use(dayOfTheWeekAdvice);

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs",
    { day: dayOfWeek,
      time: dayTime
     }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

