const _ = require("underscore");
const R = require('ramda');

const result = _.contains([1, 2, 3], 2);
var odds = _.reject([1, 2, 3, 4, 5, 6], function (num) {
  return num % 2 == 0;
});

const paymentTypes = [
  {
    name: '7-ELEVEN超商取貨付款',
    code: '20',
    key: 'seven',
    component: '',
    sort: 1000,
  },
  {
    name: '蝦皮付款',
    code: '13',
    key: 'shopee',
    component: '',
    sort: 2000,
  },
];

console.log(result);
console.log(odds);

// 更多: https://underscorejs.org/

const paymentTypeEnum = (() => {
  const { mergeAll, zipObj, map } = R;

  return mergeAll(
    map(x => {
      return zipObj([x.key], [x.code]);
    }, paymentTypes),
  );
})()

console.log(paymentTypeEnum);

