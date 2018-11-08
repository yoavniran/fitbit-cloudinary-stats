import initComponent from "./base";

let spinner = null,
	api = null;

export default () => {
	if (!spinner) {
		api = initComponent("spinner", {
			enable: () => {
				api.show();
				spinner.state = "enabled";
			},
			disable: () => {
				spinner.state = "disabled";
				api.hide();
			}
		});

		spinner = api._elm;
	}

	return api;
}