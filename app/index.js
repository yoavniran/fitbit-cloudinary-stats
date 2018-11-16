import * as messaging from "messaging";
import {vibration} from "haptics";
import {inbox} from "file-transfer";
import * as jpeg from "jpeg";
import * as fs from "fs";
import getUi from "./ui";
import {MSG_TYPES} from "../common/consts";

let gotTagImages = false;

const ui = getUi();

const initialize = () => {
	gotTagImages = false;
	ui.spinner.enable();
	ui.imagesStatus.showError();
	ui.mainContainer.hide();
};

const msgHandlers = {
	[MSG_TYPES.REPORT]: (data) => {

		ui.spinner.disable();
		ui.mainContainer.show();
		ui.mainContainer.scrollToTop();

		if (data.error) {
			console.log("loading failed !!!!!!!!");

			vibration.start("nudge");
			ui.status.showError();
		}
		else {
			console.log("about to show report ui !!!!");

			vibration.start("bump");
			ui.status.showSuccess();
			ui.report.setData(data);
			ui.report.show();
		}
	},

	[MSG_TYPES.INITIALIZE]: () => {
		initialize();
	}
};

messaging.peerSocket.onmessage = (e) => {
	console.log(`App received msg of type: ${e.data.type}`);

	if (msgHandlers[e.data.type]) {
		msgHandlers[e.data.type](e.data.data);
	}
};

messaging.peerSocket.onopen = () => {
	console.log("App Socket Open");
};

messaging.peerSocket.onclose = () => {
	console.log("App Socket Closed");
};

const updateImagesStatus = (newStatus) => {
	if (!gotTagImages && newStatus){
		ui.imagesStatus.showSuccess();
		gotTagImages = true;
	}
};

function processAllFiles() {
	let fileName;

	while (fileName = inbox.nextFile()) {
		const outFileName = fileName + ".txi";
		jpeg.decodeSync(fileName, outFileName, {overwrite: true});
		fs.unlinkSync(fileName);

		updateImagesStatus(true);

		ui.images.showImage(`/private/data/${outFileName}`);
	}
}

inbox.addEventListener("newfile", processAllFiles);

processAllFiles();

initialize();