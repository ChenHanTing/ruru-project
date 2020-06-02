const _ = require("underscore");

const result = _.contains([1, 2, 3], 2);
var odds = _.reject([1, 2, 3, 4, 5, 6], function (num) {
  return num % 2 == 0;
});

console.log(result);
console.log(odds);

// 更多: https://underscorejs.org/
