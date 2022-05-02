const delBtns = document.getElementsByClassName("deleteDevice");
console.log(delBtns);

delBtns.addEventListener("click", (e) => {
  console.log(e.target);
});
