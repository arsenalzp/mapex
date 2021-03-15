# Mapex
Set the value and expiration of a key for the Map by using Redis syntax.

## Installation

```bash
npm install mapex
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
  console.log('GET ',map.get('ONE'));
  console.log('TTL ', map.ttl('ONE'));
}, 2100)

setTimeout(() => {
  console.log('GET ', map.get('ONE'));
  console.log('TTL ', map.ttl('ONE'));
}, 3300)

setTimeout(() => {
  console.log('GET ', map.get('ONE'));
  console.log('TTL ', map.ttl('ONE'));
}, 4400)

setTimeout(() => {
  console.log('GET ', map.get('ONE'));
  console.log('TTL ', map.ttl('ONE'));
}, 5000)
```

### API


## History
version 1.0.2

## License
GPLv3 or later
