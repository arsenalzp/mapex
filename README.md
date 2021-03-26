# Mapex
Set the value and expiration of a key for the Map by using Redis syntax.

## Installation

```bash
npm install map-expires
```

## Usage

Set key to hold value and set key to timeout after a given number of seconds. 
You can retrieve TTL of the given key by using ttl(key) method.

### Example

```js
const Mapex = require('map-expires');
const map = new Mapex();

map.setex('ONE', 5, 'ARG1');

setTimeout(() => {
  console.log('GET ',map.get('ONE')); // GET  ARG1
  console.log('TTL ', map.ttl('ONE')); // TTL  3
}, 2100)

setTimeout(() => {
  console.log('GET ', map.get('ONE')); // GET  ARG1
  console.log('TTL ', map.ttl('ONE')); // TTL  2
}, 3300)

setTimeout(() => {
  console.log('GET ', map.get('ONE')); // GET  ARG1
  console.log('TTL ', map.ttl('ONE')); // TTL  1
}, 4400)

setTimeout(() => {
  console.log('GET ', map.get('ONE')); // GET  undefined
  console.log('TTL ', map.ttl('ONE')); // TTL  -1
}, 5000)
```

## History
version 1.0.6

## License
GPLv3 or later
