const objectToEntries = (obj) => Object.keys(obj).map((k) => [k, obj[k]]);

const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
  { user: "fredy", age: 40, active: true },
  { user: "Wayne", age: 40, active: true },
  { user: "Sam", age: 40, active: true },
  { user: "Eric", age: 40, active: true },
];

const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map((x) => x.length)),
      }).map((x) => [])
    )
    .map((val) => fn(...val));

result = partition(users, (o) => o.active);
console.log(result);

unzip_result = unzipWith(
  [
    [1, 10, 100],
    [2, 20, 200],
  ],
  (...args) => args.reduce((acc, v) => acc + v, 0)
); // [3, 30, 300]
console.log(unzip_result);

const findPrefix = (strings) => {
  if (!strings.length) {
    return ""; // or null or undefined; your choice
  }

  let sorted = strings.slice(0).sort(), // copy the array before sorting!
    string1 = sorted[0],
    string2 = sorted[sorted.length - 1],
    i = 0,
    l = Math.min(string1.length, string2.length);

  while (i < l && string1[i] === string2[i]) {
    i++;
  }

  return string1.slice(0, i);
};

prefix_result = findPrefix(["abduuu", "abdgyug"]);
console.log(prefix_result);
