document.getElementById("list").addEventListener("click", (e) => {
  // 檢查被按的元件確實在這個list裡面
  const li = e.target.closest("li");
  if (!li || !list.contains(li)) return;

  alert(li.dataset.num);
});
