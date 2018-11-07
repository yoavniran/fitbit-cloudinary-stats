import * as messaging from "messaging";
import {settingsStorage} from "settings";
import {CLD_SETTINGS, MSG_TYPES} from "../common/consts";
import {fetchReport} from "./cloudinary";

const cldSettings = {
	cloud: null,
	apikey: null,
	secret: null,
};

const isCldSetting = (key) => ~CLD_SETTINGS.indexOf(key);

// Message socket opens
messaging.peerSocket.onopen = () => {
	console.log("Companion Socket Open");
	initialize();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
	console.log("Companion Socket Closed");
};

const updateCldSetting = (key, val, initializing = false) =>{
	const isCld = isCldSetting(key);

	if (isCld) {
		cldSettings[key] = val;
		retrieveCloudinaryData(initializing); //update data from Cloudinary
	}

	return isCld;
};

// A user changes settings
settingsStorage.onchange = (e) => {

	let val = null;

	if (e.newValue) {
		val = JSON.parse(e.newValue).name
	}

	console.log(`settings '${e.key}' value changed = `, val);

	if (!updateCldSetting(e.key, val)){
		//todo: send app setting to device
	}
};

const initialize = () => {
	for (let index = 0; index < settingsStorage.length; index++) {
		const key = settingsStorage.key(index);

		if (key) {
			const val = JSON.parse(settingsStorage.getItem(key)).name;

			console.log("initialize = retrieved from storage: ", key, val);

			if (!updateCldSetting(key, val, true)){
				//todo: send app setting to device

			}
		}
	}
};

const retrieveCloudinaryData = (initializing) => {

	if (cldSettings.cloud &&
		cldSettings.apikey &&
		cldSettings.secret) {

		fetchReport(cldSettings)
			.then((result)=>{

				if (result.error){
					sendToPeer(MSG_TYPES.ERROR);
				}
				else{
					console.log("Report Retrieved = ", result);
					sendToPeer(MSG_TYPES.REPORT, result);
				}
			})
			.catch((err)=>{
				console.log("something bad happened !!!", err);
			})
	}
	else if (!initializing) {
		console.log("Dont have all of the cloudinary settings yet");

		//todo: send message to device that settings arent ready
	}
};

const sendToPeer  = (type, data = {}) => {
	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
		messaging.peerSocket.send({
			type,
			data,
		});
	}
};

// Send data to device using Messaging API
// function sendVal(data) {
// 	if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
// 		messaging.peerSocket.send(data);
// 	}
// }
