import * as mqtt from "mqtt"; // import everything inside the mqtt module and give it the namespace "mqtt"
const options = {
  port: 1884,
  clientId: "robin",
  clean: false,
};

let client = mqtt.connect("ws://abb-mosca.cloud.abbspets.se", options); // create a client

export { client, mqtt, options };
