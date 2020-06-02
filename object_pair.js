const objectFromPairs = (arr) =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

objectFromPairs([
  ["a", 1],
  ["b", 2],
]); // {a: 1, b: 2}

const toPairs = (obj) =>
  obj[Symbol.iterator] instanceof Function && obj.entries instanceof Function
    ? Array.from(obj.entries())
    : Object.entries(obj);

toPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
toPairs([2, 4, 8]); // [ [0, 2], [1, 4], [2, 8] ]
toPairs("shy"); // [ ['0', 's'], ['1', 'h'], ['2', 'y'] ]
toPairs(new Set(["a", "b", "c", "a"])); // [ ['a', 'a'], ['b', 'b'], ['c', 'c'] ]

const objectToPairs = (obj) => Object.entries(obj);

objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
