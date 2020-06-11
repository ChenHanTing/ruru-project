function log(req, res, next) {
  console.log("Logging...");
  next(); // 將這行註解將會卡住
}

module.exports = log;
