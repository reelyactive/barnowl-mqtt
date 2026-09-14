/**
 * Copyright reelyActive 2026
 * We believe in an open Internet of Things
 */


import { EventEmitter } from 'node:events';
import Raddec from 'raddec';
import MessageDecoder from './messagedecoder.js';


/**
 * BarnowlMqtt Class
 * Collects raddec events via MQTT.
 */
class BarnowlMqtt extends EventEmitter {

  /**
   * BarnowlMqtt constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    super();
    options = options || {};
    options.barnowl = this;

    this.listeners = [];
    this.messageDecoder = new MessageDecoder({ barnowl: this });
  }

  /**
   * Add a listener to the given MQTT broker.
   * @param {Class} ListenerClass The (uninstantiated) listener class.
   * @param {Object} options The options as a JSON object.
   */
  addListener(ListenerClass, options) {
    options = options || {};
    options.decoder = this.messageDecoder;

    const listener = new ListenerClass(options);
    this.listeners.push(listener);
  }

  /**
   * Handle and emit the given raddec.
   * @param {Raddec} raddec The given Raddec instance.
   */
  handleRaddec(raddec) {
    // TODO: observe options to normalise raddec
    this.emit("raddec", raddec);
  }

  /**
   * Handle and emit the given infrastructure message.
   * @param {Object} message The given infrastructure message.
   */
  handleInfrastructureMessage(message) {
    this.emit("infrastructureMessage", message);
  }

}


export { default as MqttListener } from './mqttlistener.js';
export default BarnowlMqtt;
