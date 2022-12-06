const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");
const cors = require("cors");
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
//npm i cors() 하면 서버에서도 cors 허용설정이 가능하다.
//프론트에서 암만 header에 cors 허용한다고 해도 서버가 허용안하면 안되는거 같다.
//localhost:8080 -> localhost:3030으로 쏘는것을 허용해주는 것이다.
app.use(cors());
//body에서 json파라미터로 서버에 올 수 있는데 이걸 설정해야 json형태로 파라미터를 받을 수 있다.
app.use(express.json({ limit: "50mb" }));
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
  // request.session["email"] = "dnjsalsgh123@naver.com";
  // res.send("ok");
  try {
    console.log(request.body.param);
    await req.db("signUp", request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0]) {
        request.session[key] = request.body.param[0][key];
      }
      res.send(request.body.param[0]);
    } else {
      res.send({ error: "Please try again or contact system manager" });
    }
  } catch (err) {
    res.send({ error: "db access error" });
  }
});
app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("ok");
});

//업로드하는 api
app.post("/upload/:productId/:type/:fileName", async (request, res) => {
  let { productId, type, fileName } = request.params;
  const dir = `${__dirname}/uploads/${productId}`;
  const file = `${dir}/${fileName}`;
  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(file, data, "base64", async (error) => {
    await req.db("productImageInsert", [
      {
        product_id: productId,
        type: type,
        path: fileName,
      },
    ]);

    if (error) {
      res.send({
        error,
      });
    } else {
      res.send("ok");
    }
  });
});

app.get("/download/:productId/:fileName", (request, res) => {
  const { productId, type, fileName } = request.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res);
});

// /api 뒤에 어떤 문자가 오든 아래 것이 실행됩니다.
app.post("/api/:alias", async (request, res) => {
  // if (!request.session.email) {
  //   return res.status(401).send({ error: "You need to login" });
  // }
  try {
    res.send(await req.db(request.params.alias, request.body.param)); //body에 있는 파라미터를 가져온다.
  } catch (error) {
    res.status(500).send({ error: err });
  }
});

const req = {
  async db(alias, param = [], where = "") {
    console.log(alias, sql[alias]);
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};
