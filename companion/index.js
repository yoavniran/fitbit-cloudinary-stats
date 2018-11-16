import * as messaging from "messaging";
import {settingsStorage} from "settings";
import {CLD_SETTINGS, MSG_TYPES, TAG_FILE_PREFIX} from "../common/consts";
import {fetchReport, fetchLatestForTag} from "./cloudinary";
import sendFile from "./fileSender";

const DEFAULTS = {
	toggleTag: false,
};

const DEVICE_SETTINGS = [];

const cldSettings = {
	cloud: null,
	apikey: null,
	secret: null,
};

const ALL_SETTINGS = CLD_SETTINGS.concat(DEVICE_SETTINGS);

let hasAllCldSettings = false;

const sendToDevice = (type, data = {}) => {
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send({
			type,
			data,
		});

		console.log("!!!!!!!!! sent message of type = ", type);
	}
	else {
		console.log("!!!!!!!!!! cant send, socket is closed !!!!");
	}
};

const isCldAccountSetting = (key) => ~CLD_SETTINGS.indexOf(key);

const isDeviceSetting = (key) => ~DEVICE_SETTINGS.indexOf(key);

const getSettingValue = (value) => {
	let val = null;
	const parsed = JSON.parse(value);

	if (typeof parsed === "boolean") {
		val = parsed;
	}
	else {
		val = parsed.name
	}

	return val;
};

const retrieveCloudinaryData = (initializing) => {

	if (cldSettings.cloud &&
		cldSettings.apikey &&
		cldSettings.secret) {

		hasAllCldSettings = true;

		fetchReport(cldSettings)
			.then((result) => {

				if (result.error) {
					sendToDevice(MSG_TYPES.ERROR);
				}
				else {
					console.log("Report Retrieved = ", result);
					sendToDevice(MSG_TYPES.REPORT, result);
				}
			})
			.catch((err) => {
				console.log("something bad happened !!!", err);
			})
	}
	else if (!initializing) {
		console.log("Dont have all of the cloudinary settings yet");
		hasAllCldSettings = false;
		//todo: send message to device that settings arent ready
	}
};

const updateCldSetting = (key, val, initializing = false) => {
	const isCld = isCldAccountSetting(key);

	if (isCld) {
		cldSettings[key] = val;
		retrieveCloudinaryData(initializing); //update data from Cloudinary
	}

	return isCld;
};

const handleSetting = (key, val, initializing = false) => {
	updateCldSetting(key, val, initializing);
	retrieveCloudinaryTagPhotos();

	if (isDeviceSetting(key)) {
		//todo: send app setting to device
	}
};

const initialize = () => {
	ALL_SETTINGS.forEach((key)=>{
		const val = getSettingValue(settingsStorage.getItem(key));
		handleSetting(key, val, true);
	});
};

messaging.peerSocket.onmessage = function (evt) {

	console.log("!!!!!!!!!! received message of type = ", evt.data.type);

	if (evt.data.type === MSG_TYPES.UPDATE) {
		sendToDevice(MSG_TYPES.INITIALIZE);
		initialize();
	}

};

// Message socket opens
messaging.peerSocket.onopen = () => {
	initialize();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
	console.log("Companion Socket Closed");
};


// A user changed a setting
settingsStorage.onchange = (e) => {
	const val = getSettingValue(e.newValue);
	console.log(`settings '${e.key}' value changed = `, val);
	handleSetting(e.key, val);
};

const retrieveCloudinaryTagPhotos = () => {

	if (hasAllCldSettings) {
		const toggle = getSettingValue(settingsStorage.getItem("toggleTag")),
			tag = getSettingValue(settingsStorage.getItem("tag"));

		if (toggle && tag) {
			fetchLatestForTag(tag, cldSettings)
				.then((result) => {
					console.log("tagged photos retrieved");

					result.forEach((f, i) => {
						sendFile({
							url: f.url,
							id: `cld${i}`,
						}, TAG_FILE_PREFIX);
					});
				})
				.catch((err) => {
					console.log("something bad happened !!!", err);
				});
		}
	}
};

const setDefault = (name) => {
	if (settingsStorage.getItem(name) === null) {
		settingsStorage.setItem(name, DEFAULTS[name]);
	}
};

const initDefaults = () => {
	Object.keys(DEFAULTS).forEach(setDefault);
};

initDefaults();

