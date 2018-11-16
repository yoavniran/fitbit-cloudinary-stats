import * as messaging from "messaging";
import initComponent from "./base";
import {MSG_TYPES} from "../../common/consts";

let button = null,
	api = null;

export default () => {
	if (!button) {
		api = initComponent("update-button", {});
		button = api._elm;

		button.onactivate = () => {

			console.log("!!!!!!!!!!! sending update request");

			if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
				messaging.peerSocket.send({type: MSG_TYPES.UPDATE});
			}
		};
	}

	return api;
}
