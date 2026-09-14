/**
 * Copyright reelyActive 2026
 * We believe in an open Internet of Things
 */


import { decode } from "cbor2";
import Raddec from "raddec";


/**
 * MessageDecoder Class
 * Decodes messages from one or more MQTT brokers and forwards the packets to
 * the given BarnowlMqtt instance.
 */
class MessageDecoder {

  /**
   * MessageDecoder constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.barnowl = options.barnowl;
  }

  /**
   * Handle message from a given broker, specified by the origin
   * @param {Buffer} message The message as a Buffer.
   * @param {string} origin The unique origin identifier (i.e. topic).
   * @param {number} time The time of the data capture.
   * @param {Object} decodingOptions The message decoding options.
   */
  handleMessage(message, origin, time, decodingOptions) {
    const data = convertMessageToJson(message);
    if(data) {
      try {
        const raddec = new Raddec(data);
        this.barnowl.handleRaddec(raddec);
      }
      catch(error) {
        // It is not a raddec
      }
    }
  }

}


/**
 * Convert the given MQTT message to JSON, possibly with CBOR decoding.
 * @param {Buffer} message The message itself, as a Buffer.
 * @return {Object} The message as JSON, or null if undecipherable.
 */
function convertMessageToJson(message) {
  try {
    const jsonString = message.toString("utf8");
    return JSON.parse(jsonString);
  }
  catch(error) {
    // It is not valid JSON
  }

  try {
    return decode(message);
  }
  catch(error) {
    return null; // It is not valid CBOR either
  }
}


export default MessageDecoder;
