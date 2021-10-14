var moment = require('moment');
const time = moment.duration(1, 'second');
time.add(1, 'second');
// time.add(1,'second')
// START CLOCK SCRIPT

Number.prototype.pad = function (n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, '0');
  let formattedSS = ss.toString().padStart(2, '0');
  let formattedMS = ms.toString().padStart(2, '0');

  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}
let startTime;
let elapsedTime = 0;
let timerInterval;
startTime = Date.now() - elapsedTime;

timerInterval = setInterval(function printTime() {
  elapsedTime = Date.now() - startTime;
 
}, 10);

// END CLOCK SCRIPT
