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
    for (let i = 1; i <= 1000; i++) {
      const html = await getHtml(i);
      if (!html) continue;

      const $ = cheerio.load(html);
      const championName = $(
        "body > main > div.contents > section > div.summary-heading > h3"
      );
      const championObject = {
        id: i,
        name: championName.text().trim(),
      };
      resultChampions.push(championObject);
    }
    return resultChampions;
  } catch (error) {}
};

//champion이라는 테이블에 정보 넣기
championName().then((champ) => {
  if (!champ) {
    return;
  }
  connection.connect();
  champ.map((c) => {
    connection.query(
      `insert into dev.champion set champ_num=${c.id}, name='${c.name}'`
    );
  });
  connection.end();
});
