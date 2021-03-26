class Mapex extends Map {
	constructor() {
		super();
		this._cache = new Map(); // create internal cache to keep {key,expiration} object
	}

	delete(key) {
		this._cache.delete(key);
		return super.delete(key);
	}
	
	// set expiration time in cache
	setex(key, expire, value) {
		if (expire < 0 || typeof expire !== 'number') {
			throw TypeError('Expires should be an abs number');
		}
		const _key = key;
		const _expire = expire * 1000;
		const _value = value;
		const _timeStamp = Date.now();
		super.set(_key, _value);
		this._cache.set(_key, {'expires': _expire, 'timeStamp': _timeStamp, 'delta': 0 });
	}

	// get TTL by key
	ttl(key) {
		const ttlInMs = this._calcTll(key)
		if (!Math.trunc(ttlInMs)) return -1
		return Math.round(ttlInMs / 1000)
	}

	// get property by key
	get(key) {
		const ttlInMs = this._calcTll(key);
		if (!ttlInMs) return undefined
		return super.get(key);
	}

	// calculate TTL
	_calcTll(key) {
		if(!this._cache.has(key)) return undefined

		const _currentTime = Date.now();
		let { expires, timeStamp, delta } = this._cache.get(key);
		const _odds = _currentTime - timeStamp; // odds between current time Date.now() (ms) and object timeStamp (ms)

		// delete object from cache and Map if odds older then expires time (ms)
		if (_odds > expires) {
			this._cache.delete(key);
			super.delete(key);
			return undefined
		} 

		// calculate delta 
		delta = delta + (_currentTime - timeStamp);

		// check delta - if access time is lower than 1000 ms (1s) - don't decrease expiration time
		if (delta < 1000) {
			this._cache.set(key, { 'expires': expires, 'timeStamp': _currentTime, 'delta': delta });
			return expires
		}

		// check delta - if access time is greater than 1000 ms (1s) - decrease expiration time
		if (delta >= 1000) {
			this._cache.set(key, { 'expires': expires - delta, 'timeStamp': _currentTime, 'delta': 0 });
			const expiresToSec = expires - delta;
			return expiresToSec
		}
	}

}

module.exports = Mapex;


