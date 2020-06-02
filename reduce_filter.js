const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const reducedArray = (data, keys) =>
  data.map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const data = [
  {
    id: 1,
    name: "john",
    age: 24,
  },
  {
    id: 2,
    name: "mike",
    age: 50,
  },
  {
    id: 3,
    name: "",
    age: 50,
  },
];

const reduceResult = reducedFilter(
  data,
  ["id", "name"],
  (item) => item.age > 24
); // [{ id: 2, name: 'mike'}]

const reduceResult02 = reducedArray(data, ["id", "name"]); // [{ id: 2, name: 'mike'}]

const reduceResult03 = reducedFilter(
  data,
  ["id", "name"],
  (item) => item.name !== ""
); // [{ id: 2, name: 'mike'}]

console.log(reduceResult);
console.log(reduceResult02);
console.log(reduceResult03);
