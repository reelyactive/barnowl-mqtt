/**
 * Copyright reelyActive 2026
 * We believe in an open Internet of Things
 */


import mqtt from 'mqtt';


const DEFAULT_URL = 'mqtt://localhost';
const DEFAULT_CLIENT_OPTIONS = { queueQoSZero: false };
const DEFAULT_TOPIC = 'v1/reelyactive/local/#';


/**
 * MqttListener Class
 * Listens for messages as the client of a MQTT server.
 */
class MqttListener {

  /**
   * MqttListener constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};
    this.decoder = options.decoder;
    this.topics = options.topics || [ DEFAULT_TOPIC ];

    // The (provided) MQTT client has already been instantiated
    if(options.client) {
      this.client = options.client;
      this.isClientConnected = this.client.connected;
      if(this.isClientConnected) {
        subscribeTopics(this.client, this.topics);
      }
    }
    // Create MQTT client using the provided or default options
    else {
      this.isClientConnected = false;
      this.client = mqtt.connect(options.url || DEFAULT_URL,
                              options.clientOptions || DEFAULT_CLIENT_OPTIONS);
    }

    manageMqttClient(this);
  }

}


/**
 * Manage the MQTT client.
 * @param {BarnowlMqtt} instance The BarnowlMqtt instance.
 */
function manageMqttClient(instance) {
  instance.client.on('connect', () => {
    instance.isClientConnected = true;
    subscribeTopics(instance.client, instance.topics);
    console.log('barnowl-mqtt: connected to MQTT server');
  });
  instance.client.on('message', (topic, message) => {
    instance.decoder.handleMessage(message, topic, Date.now(), {});
  });
  instance.client.on('close', () => {
    if(instance.isClientConnected) {
      instance.isClientConnected = false;
      console.log('barnowl-mqtt: disconnected from MQTT server');
    }
  });
  instance.client.on('error', (error) => {
    console.log('barnowl-mqtt: MQTT client error');
    console.log(error);
  });
}


/**
 * Subscribe to the MQTT topic(s).
 * @param {Mqtt} client The MQTT client.
 * @param {array} topics The topics to which to subscribe.
 */
function subscribeTopics(client, topics) {
  for(const topic of topics) {
    client.subscribe(topic, (err) => {
      if(err) { console.log(`barnowl-mqtt: error subscribing to ${topic}`); }
    });
  }
}


export default MqttListener;
