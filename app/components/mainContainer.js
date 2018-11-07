import document from "document";

let container = null,
	api = null;

const showMainContainer = () => {
	container.style.display = "inline";
};

const hideMainContainer = () => {
	container.style.display = "none";
};

export default () => {
	if (!container) {
		container = document.getElementById("main-container");

		api = {
			showMainContainer,
			hideMainContainer,
		};
	}

	return api;
}