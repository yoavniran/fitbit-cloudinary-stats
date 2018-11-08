import getSpinner from "./components/spinner";
import getMainContainer from "./components/mainContainer";
import getReport from "./components/report";

let ui = null;

export default () => {
	if (!ui) {
		ui = {
			spinner: getSpinner(),
			mainContainer: getMainContainer(),
			report: getReport(),
		};
	}

	return ui;
}