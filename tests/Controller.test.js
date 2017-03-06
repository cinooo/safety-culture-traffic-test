var chai = require("chai");
var expect = chai.expect;
import Controller from '../src/Controller.js'
import TrafficLight from '../src/TrafficLight.js'

describe('Controller', () => {
  it('should not instantiate with any parameters passed in', function() {
    expect(function() {
       new Controller(1)
     }).to.throw(Error);
  });

  describe('#addLight', function() {
    it('should not have any traffic lights if none are added', function() {
      let controller = new Controller();
      expect(controller._trafficLights).to.have.length(0);
      controller.addLight();
      expect(controller._trafficLights).to.have.length(0);
    })

    it('should have one traffic light if one is added', function() {
      let controller = new Controller();
      controller.addLight(new TrafficLight('NS', 'GREEN'));
      expect(controller._trafficLights).to.have.length(1);
    })

    it('should have two traffic lights if two is added', function() {
      let controller = new Controller();
      controller.addLight(new TrafficLight('NS', 'GREEN'));
      controller.addLight(new TrafficLight('EW', 'RED'));
      expect(controller._trafficLights).to.have.length(2);
    })
  })

  describe('#updateLightsStatus', function() {
    it('should not be able to pass in a time outside of 5 minutes', function() {
      let controller = new Controller();
      controller.addLight(new TrafficLight('EW', 'RED'));
      let time = 6 * 60 * 1000;
      expect(function() {
        controller.updateLightsStatus(time)
      }).to.throw(Error);
    })

    it ('should update traffic lights if time is within 5 minutes', function() {
      let controller = new Controller();
      controller.addLight(new TrafficLight('NS', 'GREEN'));
      controller.addLight(new TrafficLight('EW', 'RED'));
      let time = 3.5 * 60 * 1000;
      expect(function() {
        controller.updateLightsStatus(time)
      }).to.not.throw(Error);
    })
  });

  describe('#start', function() {
    let controller = new Controller();
    controller.addLight(new TrafficLight('EW', 'RED'));
    let time = 6 * 60 * 1000;
    const interval = 0.5 * 60 * timeFactor;  // 30 second interval
    const swapTime = 5 * 60 * timeFactor; // lights swap every 5 minutes

    it('should not allow an interval time longer to be the light changing swap time', function() {
      expect(function() {
        controller.start(200, 10)
      }).to.throw(Error);
    })

    it('should return back an interval number', function() {
      expect(function() {
        controller.start(interval, swapTime)
      }).to.not.throw(Error);
    })
  });
});
