import document from "document";

let spinner = null,
	api = null;

const showSpinner = () => {
	spinner.style.display = "inline";
	spinner.state = "enabled";
};

const hideSpinner = () => {
	spinner.style.display = "none";
	spinner.state = "disabled";
};

export default () => {
	if (!spinner) {
		spinner = document.getElementById("spinner");

		api = {
			showSpinner,
			hideSpinner,
		};
	}

	return api;
}