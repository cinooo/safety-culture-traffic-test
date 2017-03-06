import TrafficLight from './TrafficLight.js';
import Controller from './Controller.js';

let controller = new Controller();
controller.addLight(new TrafficLight('NS', 'GREEN'));
controller.addLight(new TrafficLight('EW', 'RED'));

global.timeFactor = process.env.TIME_FACTOR || 1000;   // set this to a shorter time for testing purposes
console.log('time factor being used:', timeFactor);

const interval = 0.5 * 60 * timeFactor;  // 30 second interval
const swapTime = 5 * 60 * timeFactor; // lights swap every 5 minutes
controller.start(interval, swapTime);

const maxTime = 30 * 60 * timeFactor; // max running time of 30 minutes
const runningTime = setInterval(() => {
  if (maxTime == controller.runningTime) {
    controller.end();
    clearInterval(runningTime);
    console.log('Application is ending after 30 minutes');
  }
}, timeFactor)
