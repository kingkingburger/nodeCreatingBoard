import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

interface championInfo {
  id: number;
  name: string;
}

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
    for (let i = 1; i <= 10; i++) {
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

//flag : "a+"는 파일을 덮어쓰지 않는다는 설정
championName().then((champ) => {
  if (!champ) {
    return;
  }
  champ.map((c) => {
    fs.writeFileSync("./crawling/sample.txt", `${JSON.stringify(c)}\n`, {
      flag: "a+",
    });
  });
});
