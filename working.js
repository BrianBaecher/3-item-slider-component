let items = document.querySelectorAll(".item");
let setProp = document.documentElement.style;
let arr = [];

for (let i = 0; i < items.length; i++) {
  arr.push({
    block: items[i],
    x: 0,
    y: 0,
  });
}

window.addEventListener("click", shuffle);

function shuffle() {
  console.table("start", arr);
  // cycle first in order
  cycleObj(arr[0]);
  // slide remainder
  //   for (let i = 1; i < arr.length; i++) {
  //     slideObj(arr[i]);
  //   }
  slideObj(arr[1])
  setTimeout(() => {
    slideObj(arr[1]);
  }, 1000);
  // update the order
  arr.push(arr[0]);
  arr.splice(0, 1);
  console.table("end", arr);
}

/* 
Something about combining the two slides/running them simultaneously
is causing the issue with yellow popping into the center of the 
screen
*/

// pass in the entire object for each block
function slideObj(x) {
  x.block.classList.add("slide");
  setProp.setProperty("--slide-start-pos", `${x.x}px`);
  x.x -= 175;
  setProp.setProperty("--slide-end-pos", `${x.x}px`);
  setTimeout(() => {
    x.block.classList.remove("slide");
    x.block.style.transform = `translateX(${x.x}px)`;
  }, 1000);
}

// pass in the entire object for each block
function cycleObj(x) {
  console.log(x.block, "cycled");
  x.block.classList.add("cycle");
  //   start
  setProp.setProperty("--cycle-start-pos", `${x.x}px`);
  x.y += 45;
  //   25%
  setProp.setProperty("--cycle-25-pos", `${x.y}px`);
  //   50%
  setProp.setProperty("--cycle-50-Ypos", `${x.y}px`);
  x.x += 350;
  setProp.setProperty("--cycle-50-Xpos", `${x.x}px`);
  //   75%
  setProp.setProperty("--cycle-75-Ypos1", `${x.y}px`);
  x.y -= 45;
  setProp.setProperty("--cycle-75-Xpos", `${x.x}px`);
  // FINAL -- at this point, Y will be 0, so final pos is just X
  setProp.setProperty("--cycle-final-pos", `${x.x}px`);
  setTimeout(() => {
    x.block.classList.remove("cycle");
    x.block.style.transform = `translateX(${x.x}px)`;
  }, 2000);
}
