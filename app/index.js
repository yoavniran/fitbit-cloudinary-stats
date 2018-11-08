import * as messaging from "messaging";
import getUi from "./ui";
import {MSG_TYPES} from "../common/consts";

//todo: write latest report to file system and retrieve on start

const ui = getUi();

const msgHandlers = {
	[MSG_TYPES.REPORT]: (data) => {
		console.log("about to show report ui !!!!");
		ui.spinner.disable();
		ui.mainContainer.show();
		ui.report.setData(data);
		ui.report.show();
	},
};

messaging.peerSocket.onmessage = (e) => {
	console.log(`App received msg of type: ${e.data.type}`); // JSON.stringify(e.data.data));

	if (msgHandlers[e.data.type]) {
		msgHandlers[e.data.type](e.data.data);
	}

	// if (evt.data.key === "color" && evt.data.newValue) {
	//   let color = JSON.parse(evt.data.newValue);
	//   console.log(`Setting background color: ${color}`);
	//   background.style.fill = color;
	// }
};

messaging.peerSocket.onopen = () => {
	console.log("App Socket Open");
};


messaging.peerSocket.onclose = () => {
	console.log("App Socket Closed");
};

ui.spinner.enable();

// if monthly_price == 0
// 	return 'strategic' if !trial? && !free?
// 	'free'
// 	elsif monthly_price < 249
// 'ots_basic'
// elsif monthly_price < 800
// 'ots_advanced'
// elsif monthly_price < 1800
// 'pro'
// elsif monthly_price < 10_000
// 'premium'
// else
// 'strategic'