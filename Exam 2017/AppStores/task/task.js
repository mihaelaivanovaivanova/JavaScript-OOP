function solve() {
	// Your classes
	const VALIDATOR = {
		isString: function (x, error) {
			if (typeof x !== 'string') {
				throw new Error(error);
			}
		},
		isInRange: function (value, min, max, error) {
			if (value < min || value > max || Number.isNaN(value) || typeof (value) !== 'number') {
				throw new Error(error);
			}
		},
		isConsistedOfValidSymbols: function (x, error) {
			if (x.match(/[^a-zA-Z0-9 ]/)) {
				throw new Error(error);
			}
		},
		isPossitive: function (x, error) {
			if (Number.isNaN(x) || x <= 0 || typeof (x) !== 'number') {
				throw new Error(error);
			}
		}
	};

	function copyApp(app) {
		return {
			name: app.name,
			description: app.description,
			version: app.version,
			rating: app.rating,
			apps: app.apps // this is for stores
		};
	}

	class App {
		constructor(name, description, version, rating) {
			this.name = name;
			this.description = description;
			this.version = version;
			this.rating = rating;
		}

		get name() {
			return this._name;
		}
		set name(newName) {
			VALIDATOR.isString(newName, 'Name must be a string!');
			VALIDATOR.isInRange(newName.length, 1, 24, 'Name must be between 1 and 24 symbols!');
			VALIDATOR.isConsistedOfValidSymbols(newName, 'Name must content only latin letters, numbers and whitespaces!');
			this._name = newName;
		}
		get description() {
			return this._description;
		}
		set description(newDescription) {
			VALIDATOR.isString(newDescription, 'Description must be a string!');
			this._description = newDescription;
		}
		get version() {
			return this._version;
		}
		set version(newVersion) {
			VALIDATOR.isPossitive(newVersion, 'Version must be a possitive number!');
			this._version = newVersion;
		}
		get rating() {
			return this._rating;
		}
		set rating(newRating) {
			VALIDATOR.isInRange(newRating, 1, 10, 'Rating must be a number between 1 and 10!');
			this._rating = newRating;
		}

		release(input) {
			if (typeof input !== 'object') {
				input = { version: input };
			}
			if (input !== null && typeof input === 'object') {
				if (!(input.hasOwnProperty('version'))) {
					throw new Error('Passed object must have a version property!');
				}
				VALIDATOR.isPossitive(input.version);
				if (input.version <= this.version) {
					throw new Error('New version must be highter than old one!');
				}
				this.version = input.version;
				if (input.hasOwnProperty('description')) {
					VALIDATOR.isString(this.description, 'Description must be a string!');
					this.description = input.description;
				}
				if (input.hasOwnProperty('rating')) {
					VALIDATOR.isInRange(input.rating, 1, 10, 'Rating must be a number between 1 and 10!');
					this.rating = input.rating;
				}
			}
			return this;
		}
	}

	class Store extends App {
		constructor(name, description, version, rating) {
			super(name, description, version, rating);
			this.apps = [];
		}

		uploadApp(appObj) {
			if (!(appObj) || !(appObj instanceof App)) {
				throw new Error('Passed object can not be null and must be an instance of App!');
			}

			function appExists(obj) {
				return obj.name === appObj.name;;
			}
			let result = this.apps.find(appExists);
			if (!result) {
				this.apps.push(copyApp(appObj));
			} else if (result.version < appObj.version) {
				let index = this.apps.findIndex(appExists);
				this.apps.splice(index, 1);
				this.apps.push(copyApp(appObj));
			}
			return this;
		}

		takedownApp(appName) {
			VALIDATOR.isString(appName, 'Name must be a string!');
			VALIDATOR.isInRange(appName.length, 1, 24, 'Name must be between 1 and 24 symbols!');
			VALIDATOR.isConsistedOfValidSymbols(appName, 'Name must content only latin letters, numbers and whitespaces!');
			function appExists(obj) {
				return obj.name === appName;;
			}
			let result = this.apps.findIndex(appExists);
			if (result < 0) {
				throw new Error('App with such name does not exist!');
			} else {
				this.apps.splice(result, 1);
			}
			return this;
		}
		search(pattern) {
			function filterByApp(app, pattern) {
				return app.name.toLowerCase().indexOf(pattern.toLowerCase()) > 0
			}
			return this.apps.filter(function (app) {
				return app.name.toLowerCase().indexOf(pattern.toLowerCase()) > 0;
			}).sort((x, y) => x.name.localeCompare(y.name));
		}

		listMostRecentApps(count) {
			let numberAppsToList = count;
			if (!count) {
				numberAppsToList = 10;
			}
			if (this.apps.count <= 10) {
				return this.apps;
			}
			return this.apps.slice().reverse().slice(0, numberAppsToList);
		}

		listMostPopularApps(count) {
			let numberAppsToList = count;
			if (!count) {
				numberAppsToList = 10;
			}
			if (this.apps.count <= 10) {
				return this.apps.sort((x, y) => {
					return y.rating - x.rating;
				});
			}
			return this.apps.slice().reverse().sort((x, y) => {
				return y.rating - x.rating;
			}).slice(0, numberAppsToList);
		}
	}

	class Device {
		constructor(hostname, apps) {
			this.hostname = hostname;
			this.apps = apps;
		}
		get hostname() {
			return this._hostname;
		}
		set hostname(newHostname) {
			VALIDATOR.isString(newHostname, 'Hostname must be astring between 1 and 32 symbols!');
			VALIDATOR.isInRange(newHostname.length, 1, 32, 'Hostname must be astring between 1 and 32 symbols!');
			this._hostname = newHostname;
		}

		get apps() {
			return this._apps;
		}

		set apps(appsArray) {
			if (!(Array.isArray(appsArray))) {
				throw new Error('Passed argument must be an array of Apps!');
			}
			if (Array.isArray(appsArray)) {
				for (let app of appsArray) {
					if (!(app instanceof App)) {
						throw new Error('All passed elements must be apps!');
					}
				}
				this._apps = appsArray;
			}
		}

		search(pattern) {
			function isStore(app) {
				return (app instanceof Store);
			}
			let storesInDevice = this.apps.filter(isStore);
			let containigPattern = [];
			for (let store of storesInDevice) {
				for (let app of store.apps) {
					if (app.name.toLowerCase().indexOf(pattern.toLowerCase()) >= 0) {
						containigPattern.push(app);
					}
				}
			}
			let sortedApps = containigPattern.sort((x, y) => x.name.localeCompare(y.name));
			let i = 0;
			while (i < sortedApps.length - 1) {
				if (sortedApps[i].name === sortedApps[i + 1].name) {
					if (sortedApps[i].version <= sortedApps[i + 1].version) {
						sortedApps.splice(i, 1);
					} else {
						sortedApps.splice(i + 1, 1);
					}
				}
				else {
					i += 1;
				}
			}
			return sortedApps;

		}

		install(appName) {
			function isStore(app) {
				return (app instanceof Store);
			}
			let storesInDevice = this.apps.filter(isStore);
			let availableAppsForInstall = [];
			for (let store of storesInDevice) {
				for (let app of store.apps) {
					availableAppsForInstall.push(app);
				}
			}
			function hasSameName(app) {
				return app.name === appName;
			}
			let appsWithSameName = availableAppsForInstall.filter(hasSameName);
			if (appsWithSameName.length === 0) {
				throw new Error('No app with the passed name is found!');
			} else {
				appsWithSameName.sort((x, y) => {
					return y.version - x.version;
				});
				let appToInstall = appsWithSameName[0];
				let isAppInstalled = false;
				for (var i = 0; i < this.apps.length; i++) {
					if (this.apps[i] === appToInstall) {
						isAppInstalled = true;
					}
				}
				if (!isAppInstalled) {
					this.apps.push(appToInstall);
				}
			}

			return this;
		}

		uninstall(name) {
			function findApp(app) {
				return app.name === name;
			}
			let index = this.apps.findIndex(findApp);
			if (index < 0) {
				throw new Error('No app with such name is found!');
			} else {
				this.apps.splice(index, 1);
			}
			return this;
		}

		listInstalled() {

			return this.apps.slice().sort((x, y) => x.name.localeCompare(y.name));
		}
		
		update() {
			return this;
		}
	}
	return {
		createApp(name, description, version, rating) {
			return new App(name, description, version, rating);
		},
		createStore(name, description, version, rating) {
			return new Store(name, description, version, rating);
		},
		createDevice(hostname, apps) {
			return new Device(hostname, apps);
		}
	};
}

// Submit the code above this line in bgcoder.com
module.exports = solve;

