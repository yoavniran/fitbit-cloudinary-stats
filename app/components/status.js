import initComponent from "./base";

let status = null,
	text = null,
	scrollText = null,
	arrow = null,
	api = null;

export default () => {
	if (!status) {
		api = initComponent("status", {
			showSuccess: () => {
				arrow.style.display = "inline";
				text.text = "Report Ready";
				text.style.display = "inline";
				scrollText.style.display = "none";
			},
			showError: () => {
				arrow.style.display = "none";
				scrollText.style.fill = "#db517a";
				scrollText.text = "Error! Please check connection and cloud details";
				scrollText.state = "enabled";
				scrollText.style.display = "inline";
				text.style.display = "none";
			},
		});

		status = api._elm;
		text = status.getElementById("status-text");
		scrollText = status.getElementById("status-scroll-text");
		arrow = status.getElementById("status-arrow");
	}

	return api;
}