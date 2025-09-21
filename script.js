const currentTimeVis = document.querySelector('h2') 
const btnCont = document.querySelector(".func-buttons")
// const line = document.querySelector("hr");
// const extender = document.querySelector(".svg");
const btn = document.querySelectorAll(".button");
let alarmAudio = document.querySelector("audio");
const alarms = [];
const alarmStopDialog = document.getElementById('dialog');
const alarmStopBtn = document.getElementById("alarm-stop");
const addAlarmBtn = document.getElementById("add-alarm");
const alarmContainer = document.getElementById("alarms-container");
const alarmHittingTime = document.getElementById("alarm-time");
const stopWatchContainer = document.getElementById("stop-watch");
const dayDate = document.querySelector(".day-date h3");
const clockBtn = document.querySelector(".clock-icon-cont");
const alarmBtn = document.querySelector(".alarm-icon-cont");
const stopWatchBtn = document.querySelector(".stop-watch-icon-cont");
const mainBtns = document.querySelector(".main-btns")
const container = document.querySelector(".container");
const clockCont = document.querySelector(".clock");
const alartTimes = document.getElementById("alarm-times");

btn.forEach((e) => {
    e.addEventListener("click", () => {
        if (btn[0].classList.contains("btn-border")) {
          btn[0].classList.remove("btn-border");
          alarmContainer.style.display = "none";
          stopWatchContainer.style.display = "grid";
        } else if (btn[1].classList.contains("btn-border")) {
          btn[1].classList.remove("btn-border");
          alarmContainer.style.display = "grid";
          stopWatchContainer.style.display = "none"
        }
        e.classList.add("btn-border");
    })
})

setInterval(() => {
  const currentTime = new Date();
  const time = currentTime.toString().slice(16, 16 + 8);
  const dateDateRT = currentTime.toString().slice(0, 16)
  currentTimeVis.innerText = time;
  dayDate.innerText = dateDateRT;
  alarms.forEach((alm) => {
    if(alm === time.slice(0, 5)) playAlarm(alm);
  })
}, 1000);

function playAlarm(num) {
  if (alarmAudio.currentTime === 0) {
    alarmAudio.play();
    alarmStopDialog.style.display = "flex";
    alarmHittingTime.innerText = num;
  }
}

// create alarm 

let numOfAlarm = 1;
let alarmsArr = [];

function createAlarm() {
  const alarm = document.createElement("div")
  alarm.setAttribute("class", `alarm ${numOfAlarm}`);
  alarm.innerHTML =   `<p>Alarm ${numOfAlarm}</p>
                        <div>
                          <input type="number" min="1" max="24" class="aHr ${numOfAlarm}" id="hr" placeholder="0">
                          <input type="number" min="1" max="60" class="aMin ${numOfAlarm}" id="min" placeholder="0">
                        </div>
                        <div>
                          <button type="button" value="set-alarm" class="set-alarm ${numOfAlarm}">Set alarm</button>
                          <button type="button" value="delete-alarm" class="delete-alarm ${numOfAlarm}">Delete</button>
                        </div>`
  alarmsArr.push(alarm);
  numOfAlarm++;
}

addAlarmBtn.addEventListener('click', () => {
  createAlarm();
  alarmsArr.forEach(elem => {
    alartTimes.insertBefore(elem, document.querySelector(`.alarm[class~="${numOfAlarm}"]`));
  })
  console.log(alarmsArr);
})

// set alarm, Delete alarm 

function setAlarmFnc(num) {
  let alarmMin = document.querySelector(`.aMin[class~="${num}"]`).value;
  let alarmHr = document.querySelector(`.aHr[class~="${num}"]`).value;
  let alarmBtn = document.querySelector(`.set-alarm[class~="${num}"]`)
  const alarmMinElem = document.querySelector(`.aMin[class~="${num}"]`);
  const alarmHrElem = document.querySelector(`.aHr[class~="${num}"]`);

  if (alarmMin.length === 1) alarmMin = `0${alarmMin}`;
  if (alarmHr.length === 1) alarmHr = `0${alarmHr}`;
  if (alarmMin === "" || alarmHr === "") {
    alarmMinElem.style.borderColor = "red";
    alarmHrElem.style.borderColor = "red";
  } else if (!alarms.find(alarm => alarm === `${alarmHr}:${alarmMin}`)) {
    alarms.push(`${alarmHr}:${alarmMin}`);
    alarmBtn.textContent = "Set";
  }
}

let currentAlarm = undefined;

alarmContainer.addEventListener("click", (e) => {
  currentAlarm = e.target.classList.value.slice(-1);
  if (e.target.value === "set-alarm") {
    setAlarmFnc(currentAlarm);
  }
  if (e.target.value === "delete-alarm") {
    deleteListAlarmFnc(currentAlarm);
  }
})

//stop alarm buttons

function alarmDeletefnc(num) {
  alarms.splice([num - 1], 1)
} 

function deleteListAlarmFnc(num) {
  const removeAlarm = document.querySelector(`.alarm[class~="${num}"]`)
  alarmsArr.splice(num - 1, 1);
  alartTimes.removeChild(removeAlarm);
  alarmDeletefnc(num);
  numOfAlarm--;
}

alarmStopBtn.addEventListener("click", () => {
  alarmAudio.pause();
  alarmStopDialog.style.display = "none"
  alarmAudio.currentTime = 0;
  alarmDeletefnc(currentAlarm);
});

// stop watch 

// start

const startStopWatchBtn = document.getElementById("start-stop-watch");
const restartBtn = document.getElementById("restart");
const stopWatchMilsec = document.querySelector(".stop-milsec");
const stopWatchSec = document.querySelector(".stop-sec");
const stopWatchMin = document.querySelector(".stop-min");
const stopWatchHr = document.querySelector(".stop-hr");
const stoped = document.querySelector(".stoped");
const playing = document.querySelector(".playing");
const reset = document.querySelector(".reset");

let milSec = "00";
let sec = "00";
let min = "00";
let hr = "00";
let startStopWatch = false;

setInterval(() => {
  if (startStopWatch) {
    milSec++;

    if (milSec === 99) {
      milSec = 0;
      sec++;
    }
    if (sec === 59) {
      sec = 0;
      min++;
    }
    if (min === 59) {
      min = 0;
      hr++;
    }
    stopWatchMilsec.innerText = milSec;
    stopWatchSec.innerText = sec;
    stopWatchMin.innerText = min;
    stopWatchHr.innerText = hr;
  }
}, 10)

startStopWatchBtn.addEventListener("click", () => {
  if (startStopWatch === false) {
    startStopWatch = true
    startStopWatchBtn.style.backgroundColor = "red";
    startStopWatchBtn.style.borderColor = "red";
    playing.classList.remove("display");
    stoped.classList.add("display");
  } else {
    startStopWatch = false;
    startStopWatchBtn.style.backgroundColor = "rgb(37, 211, 104)";
    startStopWatchBtn.style.borderColor = "rgb(37, 211, 104)";
    stoped.classList.remove("display");
    playing.classList.add("display");
  }
})

// stop watch restart 

restartBtn.addEventListener("click", () => {
  milSec = "00";
  sec = "00";
  min = "00";
  hr = "00";
  stopWatchMilsec.innerText = milSec;
  stopWatchSec.innerText = sec;
  stopWatchMin.innerText = min;
  stopWatchHr.innerText = hr;
})

// butons working and animation


let currentPage = "clock";

function whichBtnIsPressed(e) {
  if (
    e.target.classList.value === "clock-icon" ||
    e.target.classList.value === "clock-icon-cont"
  ) {
    currentPage = "clock";
    return "clock";
  } else if (
    e.target.classList.value === "alarm-icon" ||
    e.target.classList.value === "alarm-icon-cont" ||
    e.target.classList.value === "alarm-icon-delegation"
  ) {
    currentPage = "alarm";
    return "alarm";
  } else if (
    e.target.classList.value === "stop-watch-icon" ||
    e.target.classList.value === "stop-watch-icon-cont" ||
    e.target.classList.value === "stop-watch-icon-del"
  ) {
    currentPage = "stop-watch";
    return "stop-watch";
  }
}

function buttonCLicked(e) {
  const btnPressed = whichBtnIsPressed(e)
  if (btnPressed === "clock") {
    clockBtn.style.transform = "scale(0.7) translate(-5px)";
    alarmBtn.style.transform = "scale(0.56)";
    stopWatchBtn.style.transform = "scale(0.56)";
    clockFnc();
  } else if (btnPressed === "alarm") {
    clockBtn.style.transform = "scale(0.56)";
    alarmBtn.style.transform = "scale(0.7) translate(-5px)";
    stopWatchBtn.style.transform = "scale(0.56)";
    alarmFnc();
  } else if (btnPressed === "stop-watch") {
    clockBtn.style.transform = "scale(0.56)";
    alarmBtn.style.transform = "scale(0.56)";
    stopWatchBtn.style.transform = "scale(0.7) translate(-5px)";
    stopWatchFnc();
  }
}

mainBtns.addEventListener("click", (e) => {
  buttonCLicked(e);
});

let btnSwitch = false;
function buttonVisibleAndAnimation() {
  if (btnSwitch) {
    mainBtns.style.transform = "translate(50px)"; 
    clockBtn.style.transform = "translateY(50px)";
    stopWatchBtn.style.transform = "translateY(-50px)"
    btnSwitch = false;
  } else {
    mainBtns.style.transform = "translate(0)";
    clockBtn.style.transform = "scale(0.56) translateY(0)";
    stopWatchBtn.style.transform = "scale(0.56) translateY(0)"
    btnSwitch = true;
  }
}
container.addEventListener("click", () => {
  container.addEventListener("click", buttonVisibleAndAnimation);
  setTimeout(() => {
    container.removeEventListener("click", buttonVisibleAndAnimation)
  }, 500)
})

const clockFnc = () => {
  clockCont.style.display = "grid";
  alarmContainer.style.display = "none";
  stopWatchContainer.style.display = "none";
}

const alarmFnc = () => {
  clockCont.style.display = "none";
  alarmContainer.style.display = "grid";
  stopWatchContainer.style.display = "none";
}

const stopWatchFnc = () => {
  clockCont.style.display = "none";
  alarmContainer.style.display = "none";
  stopWatchContainer.style.display = "grid";
}

