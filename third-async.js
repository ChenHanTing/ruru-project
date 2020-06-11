~(async function () {
  const count = (t, s) => {
    return new Promise((resolve) => {
      let a = 0;
      let timer = setInterval(() => {
        console.log(`${t} ${a} ...`);
        a = a + 1;
        if (a > 5) {
          clearInterval(timer);
          resolve(); // 表示完成
        }
      }, s);
    });
  };

  console.log("1st ping");
  await count("waiting", 100);
  console.log("2nd ping");
})();