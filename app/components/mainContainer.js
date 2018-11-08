import document from "document";
import initComponent from "./base";

let container = null,
	api = null;

export default () => {
	if (!container) {
		api = initComponent("main-container");
		container = api._elm;
	}

	return api;
}