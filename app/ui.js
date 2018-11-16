import getSpinner from "./components/spinner";
import getMainContainer from "./components/mainContainer";
import getReport from "./components/report";
import getStatus from "./components/status";
import getImages from "./components/images";
import getImagesStatus from "./components/imagesStatus";
import getUpdateButton from "./components/updateButton";

let ui = null;

export default () => {
	if (!ui) {
		ui = {
			spinner: getSpinner(),
			mainContainer: getMainContainer(),
			report: getReport(),
			status: getStatus(),
			images: getImages(),
			imagesStatus: getImagesStatus(),
			updateButton: getUpdateButton(),
		};
	}

	return ui;
}