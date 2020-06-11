const count = (t, s) => {
  let a = 0;
  let timer = setInterval(() => {
    console.log(`${t} ${a} ...`);
    a = a + 1;
    if (a > 5) {
      clearInterval(timer);
    }
  }, s);
};

console.log("1st ping");
count("waiting", 100);
console.log("2nd ping");

