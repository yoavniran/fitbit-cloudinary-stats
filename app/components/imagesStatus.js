import initComponent from "./base";

let status = null,
	text = null,
	scrollText = null,
	arrow = null,
	api = null;

export default () => {
	if (!status) {
		api = initComponent("tag-images-status", {
			showSuccess: () => {
				arrow.style.display = "inline";
				text.text = "Tag Images Ready";
				text.style.display = "inline";
				scrollText.style.display = "none";
			},
			showError: () => {
				arrow.style.display = "none";
				scrollText.style.fill = "#db517a";
				scrollText.text = "No tag images loaded - check your settings";
				scrollText.state = "enabled";
				scrollText.style.display = "inline";
				text.style.display = "none";
			},
		});

		status = api._elm;
		text = status.getElementById("images-status-text");
		scrollText = status.getElementById("images-status-scroll-text");
		arrow = status.getElementById("images-status-arrow");
	}

	return api;
}