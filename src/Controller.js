import TrafficLight from './TrafficLight.js';

export default class Controller {
  constructor(...args) {
    if (args.length > 0) {
      console.log(args);
      throw new Error('No parameters expected for Controller initialisation');
    }

    this._trafficLights = [];
    this._runningTime = 0;
    this._runningInterval;
  }

  addLight(TrafficLight) {
    this._trafficLights = typeof TrafficLight !== 'undefined' ? [...this._trafficLights, TrafficLight] : this._trafficLights;
  }

  get runningTime() {
    return this._runningTime;
  }

  set runningTime(newTime) {
    this._runningTime = newTime;
  }

  get runningInterval() {
    return this._runningInterval;
  }

  set runningInterval(int) {
    this._runningInterval = int;
  }

  updateLightsStatus(time) {
    const maxSwapTime = 5 * 60 * timeFactor;
    if (time > maxSwapTime) {
      throw new Error("time parameter can't be more than 5 minutes")
    }
    // console.log((time*100) / 1000 / 60);
    this._trafficLights.forEach((trafficLight, i) => {
      trafficLight.changeLight(time);
    })
  }

  /**
    * starts the traffic light controller
    *
    * @method start
    * @param interval (number) - how often to update light status
    * @param swapTime (number) - how often the lights will switch from RED to GREEN in milliseconds
    * @return number - the final zipped asset
  */
  start(interval, swapTime) {
    if (interval >= swapTime) {
      throw new Error("interval can't be longer than or equal to swapTime");
    }

    let totalTime = 0;
    this.runningInterval = setInterval(() => {
      totalTime += interval;
      let currentInterval = totalTime % swapTime;
      this.updateLightsStatus(currentInterval);
      this.runningTime = totalTime;
    }, interval);
    return this.runningInterval;
  }

  end() {
    clearInterval(this.runningInterval);
  }
};
