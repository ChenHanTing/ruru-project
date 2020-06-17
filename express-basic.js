/** 實際上startUpDebugger, dbDebugger不會同時存在 */
const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const logger = require("./logging");
const app = express();

// const Joi = require("@hapi/joi");
const Joi = require("joi");

// use the middleware to access the pipeline
app.use(express.json());
app.use(express.urlencoded()); // key1=val1&key2=val2 w-www-form-urlencoded
app.use(express.static('public')) 
/** 
 * 有關於靜態網頁的使用請參照: 
 * https://expressjs.com/zh-tw/starter/static-files.html
 */

app.use(helmet());
// app.use(morgan("tiny")); => 移到 app.get('env') === 'development' 執行
// in conosle: GET /static/readme.txt 404 156 - 0.571 ms

// middling function
app.use(logger);

// environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`app: ${app.get('env')}`)

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
  // export DEBUG=app:startup
  startUpDebugger('startUpDebugger: Morgan enabled...');
  // debug('Morgan enabled...');
}
// export NODE_ENV=production
// 就不會執行 console.log('Morgan enabled...');

// DB work
// export DEBUG=app:db
dbDebugger('Connected to the database...')

/**
 * export DEBUG=app:db,app:startup
 * export DEBUG=app:*
 * 
 * DEBUG=app:* nodemon express-basic.js 
 */


/**
 * Configuration
 * 
 * 環境變數相關套件
 * npm: rc
 * npm: config
 * mosh 推薦使用人數比較少的 config
 * npm i config
 * 
 * export NODE_ENV=development
 */

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

/**
 * export app_password=1234
 * custom-environment-variables.json （檔名不能拼錯）
 */
console.log('Mail Password: ' + config.get('mail.password'));

/**
 * debug: npm i debug
 */

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next(); // 將這行註解將會卡住
});

const diaries = [
  { id: 1, content: "Hello01" },
  { id: 2, content: "Hello02" },
  { id: 3, content: "Hello03" },
];

// 裡面的callback function 是一種 middleware function
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/hello", (req, res) => {
  res.send(new Array(2).fill("Ruru love Han!"));
});

app.get("/api/examples", (req, res) => {
  res.send(new Array(2).fill("Han love Ruru!"));
});

app.get("/api/examples/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/diaries", (req, res) => {
  res.send(diaries);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // http://localhost:5000/api/posts/1994/05?sortBy=name
  res.send(req.params); // params
  res.send(req.query); // query strings
});

app.get("/api/diaries/:id", (req, res) => {
  const diary = diaries.find((d) => d.id === parseInt(req.params.id));
  if (!diary)
    res.status(404).send("The diary with the given id was not found.");

  res.send(diary);
});

app.post("/api/diaries", (req, res) => {
  /**
   * const schema = {
   *   content: Joi.string().min(3).required(),
   * };

   * const result = Joi.validate(req.body, schema);

   * if (result.error) {
   *   res.status("400").send(result.error.details[0].message);
   *   return;
   * }
   */

  // Joi用法: https://www.npmjs.com/package/joi

  /**
   * if (!req.body.content || req.body.content.length < 3) {
   *    // 400 Bad Request in convention
   *    res
   *      .status("400")
   *      .send("Content is required and should be minimum 3 characters.");
   *    return;
   *  }
   */

  const { error } = validateDiary(res.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }

  const diary = {
    id: diaries.length + 1,
    name: req.body.content,
  };

  diaries.push(diary);
  res.send(diary);
});

app.put("/api/diaries/:id", (req, res) => {
  const diary = diaries.find((c) => c.id === parseInt(req.params.id));
  if (!diary)
    return res.status("400").send("The diary with the given id was not found.");

  const { error } = validateDiary(res.body);
  if (error) {
    return res.status("400").send(error.details[0].message);
  }

  // update diary
  diary.content = req.body.content;
  res.send(diary);
});

app.delete("/api/diaries/:id", (req, res) => {
  // Look up the diary
  // Not Existing, return 404
  const diary = diaries.find((c) => c.id === parseInt(req.params.id));
  if (!diary)
    return res.status("400").send("The diary with the given id was not found.");

  // Delete

  /**
   * const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
   * console.log(beasts.indexOf('bison'));
   * expected output: 1
   */

  const index = diaries.indexOf(diary);
  diaries.splice(index, 1);

  // return the same diary
  res.send(diary);
});

function validateDiary(course) {
  const schema = {
    content: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

// HARD-CODE => app.listen(3100, () => { ...
const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});