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
  console.log(map.get('ONE')); // ARG1
  console.log(map.ttl('ONE')); // 2
}, 3100)

setTimeout(() => {
  console.log(map.get('ONE')); // ARG1
  console.log(map.ttl('ONE')); // 1
}, 4300)
```

### API


## History
version 1.0.0

## License
GPLv3 or later
