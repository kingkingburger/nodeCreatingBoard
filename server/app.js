const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");

app.use(
  session({
    secret: "secret code", // 세션에 대한 키
    resave: false, // 리퀘스트 요청이 왔을 때 세션에 수정사랑이 없을 때도 다시 저장하는 기능 굳이 필요없어서 false
    saveUninitialized: false,
    cookie: {
      secure: false, // 세션에 대한 키같은걸을 사용하려면 false로 만들어야 한다.
      maxAge: 1000 * 60 * 60, // 쿠키 유혀시간 1시간
    },
  })
);

const db = {
  database: "dev",
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  port: 3308,
};

const dbPool = require("mysql").createPool(db);

const server = app.listen(3000, () => {
  console.log("Server starting port: 3000");
});

let sql = require("./sql.js");

//watchFile은 파일이 변경되는걸 감지합니다.
// __dirname은 app.js가 실행되고 있는 파일 이름을 알 수 있습니다.

fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함");
  // 캐시에 sql.js 파일이 올라가 있는 상태입니다. 그걸 지워버려야 합니다.
  delete require.cache[require.resolve("./sql.js")];
  // 다시 sql을 불러옵니다.
  sql = require("./sql.js");
});

app.post("/api/login", async (request, res) => {
  request.session["email"] = "dnjsalsgh123@naver.com";
  res.send("ok");
});
app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("ok");
});

// /api 뒤에 어떤 문자가 오든 아래 것이 실행됩니다.
app.post("/api/:alias", async (request, res) => {
  // if (!request.session.email) {
  //   return res.status(401).send({ error: "You need to login" });
  // }
  try {
    res.send(await req.db(request.params.alias));
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({ error });
        } else resolve(rows);
      })
    );
  },
};
