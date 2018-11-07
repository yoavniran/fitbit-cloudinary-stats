import getSpinner from "./components/spinner";
import getMainContainer from "./components/mainContainer";

let ui = null;

export default () => {
	if (!ui) {
		ui = {
			...getSpinner(),
			...getMainContainer(),
		};
	}

	return ui;
}