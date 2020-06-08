const express = require("express");
const app = express();

// const Joi = require("@hapi/joi");
const Joi = require("joi");

// use the middleware to access the popeline
app.use(express.json());

const diaries = [
  { id: 1, content: "Hello01" },
  { id: 2, content: "Hello02" },
  { id: 3, content: "Hello03" },
];

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
