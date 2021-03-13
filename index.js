class Mapex extends Map {
	constructor() {
		super();
		this._cache = new Map(); // create internal cache to keep {key,expiration} object
	}

	// set expiration time in cache
	setex() {
		if (arguments[1] < 0 || typeof arguments[1] !== 'number') {
			throw TypeError('Expires should be an abs number');
		}
		const _key = arguments[0];
		const _expire = arguments[1] * 1000;
		const _value = arguments[2];
		const _timeStamp = Date.now();
		super.set(_key, _value);
		this._cache.set(_key, {'expires': _expire, 'timeStamp': _timeStamp, 'delta': 0 });
	}

	// get TTL by key
	ttl(key) {
		const ttlInMs = this._calcTll(key)
		if (!ttlInMs) return -1
		return ttlInMs
	}

	// get property by key
	get(key) {
		const ttlInMs = this._calcTll(key);
		this._calcTll(key);
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
			const expiresTosec = Math.round(expires / 1000);
			return expiresTosec
		}

		// check delta - if access time is greater than 1000 ms (1s) - decrease expiration time
		if (delta >= 1000) {
			this._cache.set(key, { 'expires': expires - 1000, 'timeStamp': _currentTime, 'delta': 0 });
			const expiresTosec = Math.round(expires / 1000);
			return expiresTosec
		}
	}

}

module.exports = Mapex;


