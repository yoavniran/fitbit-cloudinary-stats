import initComponent from "./base";

let container = null,
	api = null;

export default () => {
	if (!container) {
		api = initComponent("main-container", {
			scrollToTop: () => {
				container.value = 0;
			}
		});
		container = api._elm;
	}

	return api;
}