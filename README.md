barnowl-mqtt
============

__barnowl-mqtt__ collects ambient IoT data from a MQTT broker, transforming it into standard developer-friendly JSON that is vendor/technology/application-agnostic.

![Overview of barnowl-mqtt](https://reelyactive.github.io/barnowl-mqtt/images/overview.png)

__barnowl-mqtt__ is a lightweight [Node.js package](https://www.npmjs.com/package/barnowl-mqtt) that can run on resource-constrained edge devices as well as on powerful cloud servers and anything in between.  It is included in reelyActive's [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source middleware suite, and can just as easily be run standalone behind a [barnowl](https://github.com/reelyactive/barnowl) instance, as detailed in the code examples below.


Quick Start
-----------

Clone this repository, install package dependencies with `npm install`, and then from the root folder, at any time, run _either_:

    npm start

for __barnowl-mqtt__ to attempt to connect to a local __MQTT__ broker (mqtt://localhost).

    npm start 12.34.56.78 8883

for __barnowl-mqtt__ to attempt to connect to a __MQTT__ broker at the given IP address and port.

In either case, __barnowl-mqtt__ will subscribe to the `v1/reelyactive/local/#` topic, and (flattened) __raddec__ JSON will be printed to the console.


Hello barnowl-mqtt!
-------------------

Developing an application directly from __barnowl-mqtt__?  Start by pasting the code below into a file called server.js:

```javascript
import Barnowl from "barnowl";
import BarnowlMqtt, { MqttListener } from "barnowl-mqtt";

const barnowl = new Barnowl({ enableMixing: true });

barnowl.addListener(BarnowlMqtt, {}, MqttListener, {}); // See options below

barnowl.on("raddec", (raddec) => {
  console.log(raddec);
  // Trigger your application logic here
});
```


Supported Listener Interfaces
-----------------------------

The following listener interfaces are supported by __barnowl-mqtt__.

### MQTT

Connect to a MQTT server and subscribe to one or more topics to receive messages:

```javascript
let options = { url: "mqtt://localhost", topics: [ "v1/reelyactive/local/#" ],
                clientOptions: { username: "user", password: "pass" } };
barnowl.addListener(BarnowlMqtt, {}, MqttListener, options);
```

The clientOptions are defined in the [MQTT.js Client constructor documentation](https://github.com/mqttjs/MQTT.js#client).


MQTT Topic Hierarchy
--------------------

The following topic hierarchy is observed by __barnowl-mqtt__:

    <version>/<tenant>/<location>/<device_type>/<device_id>/<device_id_type>/<function>

The path elements are as follows:

| Element        | Default     | Description                               |
|:---------------|:------------|:------------------------------------------|
| version        | v1          | Topic hierarchy version                   |
| tenant         | reelyactive | Organisation (for multi-tenancy)          |
| location       | local       | Site or logical grouping (for multi-site) |
| device_type    | device      | Optional device classification            |
| device_id      | n/a         | Unique device (radio-)identifier          |
| device_id_type | n/a         | See [Cheatsheet #idtype](https://reelyactive.github.io/diy/cheatsheet/#idtype) |
| function       | tlm/raddec  | Topic function (ex: radio decoding telemetry)  |

For example, by default, __barnowl-mqtt__ would interpret the following as a radio decoding (raddec) from a Bluetooth Low Energy device with random identifier `ba:da:55:be:ac:04` on a local (i.e. non-remote) deployment of the reelyActive organisation:

    v1/reelyactive/local/device/bada55beac04/3/tlm/raddec


Is that owl you can do?
-----------------------

While __barnowl-mqtt__ may suffice standalone for simple real-time applications, its functionality can be greatly extended with the following software packages:
- [advlib](https://github.com/reelyactive/advlib) to decode the individual packets into JSON
- [barnowl](https://github.com/reelyactive/barnowl) to combine parallel streams of RF decoding data in a technology-and-vendor-agnostic way

These packages and more are bundled together as the [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere) open source middleware suite, which includes a variety of __barnowl-x__ listeners, APIs and interactive web apps.


reelyOpinionated
----------------

__barnowl-mqtt__ observes [reelyActive's JavaScript Style Guide](https://github.com/reelyactive/javascript-style-guide).  The `npm run lint` script uses [ESLint](https://eslint.org/) and [ESLint Stylistic](https://eslint.style/) to check the code, flagging any errors and/or warnings.  The `npm run lint:fix` script applies fixes to observe the style guide.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2026 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
