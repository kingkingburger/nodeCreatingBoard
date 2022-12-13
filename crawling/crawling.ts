import axios from "axios";
import * as cheerio from "cheerio";
import { root } from "cheerio/lib/static";
import fs from "fs";
import mysql from "mysql";

interface championInfo {
  id: number;
  name: string;
}

let connection = mysql.createConnection({
  host: "localhost",
  port: 3308,
  user: "root",
  password: "1234",
});

const getHtml = async (championNumber: number) => {
  try {
    const result = await axios.get(
      `https://lol.ps/ko/champ/${championNumber}/statistics/`
    );
    return result.data;
  } catch (error) {}
};

const championName = async () => {
  try {
    const resultChampions: championInfo[] = [];
    for (let i = 1; i <= 5; i++) {
      const html = await getHtml(i);
      if (!html) continue;

      const $ = cheerio.load(html);
      const championName = $(
        "body > main > div.contents > section > div.summary-heading > h3"
      );
      const hardCampionArray: string[] = [];
      const hardCampionRateArray: string[] = [];
      for (let i = 2; i <= 4; i++) {
        const hardCampion = `body > main > div.contents > div.row.pb-2.champ-content-row > section:nth-child(3) > div > div.versus-difficult > a:nth-child(${i}) > div.champ-info`;
        hardCampionArray.push($(hardCampion).text().trim());
        const hardCampionRate = `body > main > div.contents > div.row.pb-2.champ-content-row > section:nth-child(3) > div > div.versus-difficult > a:nth-child(${i}) > div.champ-stat`;
        const rate: string = $(hardCampionRate)
          .text()
          .split("\n")
          .join("")
          .split(" ")
          .join("")
          .trim()
          .slice(-6);
        hardCampionRateArray.push(rate);
      }
      console.log("챔피언 : ", championName.text().trim(), "일때");

      console.log(hardCampionArray[0], hardCampionRateArray[0]);
      console.log(hardCampionArray[1], hardCampionRateArray[1]);
      console.log(hardCampionArray[2], hardCampionRateArray[2]);
      console.log("----------------------");

      // const championObject = {
      //   id: i,
      //   name: championName.text().trim(),
      // };
      // resultChampions.push(championObject);
    }
    return resultChampions;
  } catch (error) {}
};
championName();
//champion이라는 테이블에 정보 넣기
// championName().then((champ) => {
//   if (!champ) {
//     return;
//   }
//   connection.connect();
//   champ.map((c) => {
//     connection.query(
//       `insert into dev.champion set champ_num=${c.id}, name='${c.name}'`
//     );
//   });
//   connection.end();
// });
