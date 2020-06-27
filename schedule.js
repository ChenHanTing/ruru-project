const cron = require("node-cron");
const express = require("express");
const fs = require("fs");

let nodemailer = require("nodemailer");

app = express();

/**
 *  * * * * * *
 *  | | | | | |
 *  | | | | | day of week
 *  | | | | month
 *  | | | day of month
 *  | | hour
 *  | minute
 *  second ( optional )
 */

// schedule tasks to be run on the server
cron.schedule("* * * * *", function () {
  console.log("running a task every minute");
});

// Creating a cron job which runs on every 10 second
cron.schedule("*/10 * * * * *", function () {
  console.log("running a task every 10 second");

  // Data to write on file
  let data = `${new Date().toUTCString()}
      : Server is working\n`;

  // Appending data to logs.txt file
  fs.appendFile("logs.txt", data, function (err) {
    if (err) throw err;

    console.log("Status Logged!");
  });
});

// Calling sendEmail() function every 1 minute
cron.schedule("*/1 * * * *", function () {
  /**
   * 需開啟低安全性應用程式存取權：
   * 參考網站：https://www.youtube.com/watch?v=nRwbp2QVj5Y
   */
  sendMail();
});

// create mail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "han4dev@gmail.com",
    pass: "yourpassword",
  },
});

let mailOptions = {
  from: "han4dev@gmail.com",
  to: "k445566778899k@gmail.com",
  subject: `Test envelope`,
  text: `Hi there, this email was automatically sent by us`,
};

// Send Mail function using Nodemailer
function sendMail() {
  console.log("---------------------");
  console.log("Running Cron Job");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
}

// schedule tasks to be run on the server
cron.schedule("* * 21 * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
  fs.unlink("./error.log", (err) => {
    if (err) throw err;
    console.log("Error file succesfully deleted");
  });
});

// To backup a database
cron.schedule("59 23 * * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
  if (shell.exec("sqlite3 database.sqlite  .dump > data_dump.sql").code !== 0) {
    shell.exit(1);
  } else {
    shell.echo("Database backup complete");
  }
});

// HARD-CODE => app.listen(3100, () => { ...
const port = process.env.PORT || 3128;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

/**
 * reference:
 * 1. https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
 * 2. https://scotch.io/tutorials/nodejs-cron-jobs-by-examples
 * 3. https://www.youtube.com/watch?v=nRwbp2QVj5Y
 * 4. https://nodemailer.com/about/
 */
