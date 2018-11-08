import initComponent from "./base";

let report = null,
	bandwidthSect = null,
	bandwidthSectTitle = null,
	bandwidthSectSubTitle = null,
	storageSect = null,
	storageSectTitle = null,
	storageSectSubTitle = null,
	transSect = null,
	transSectTitle = null,
	transSectSubtTitle = null,
	api = null;

export default () => {
	if (!report) {
		api = initComponent("report-panorama", {

			setData: (data) => {
				bandwidthSectTitle.text = data.bandWidth;
				bandwidthSectSubTitle.text = data.bandWidthPercent;

				storageSectTitle.text = data.storage;
				storageSectSubTitle.text = data.storagePercent;

				transSectTitle.text = data.transformations;
				transSectSubtTitle.text = data.transformationsPercent;

				// derived: 1525,
				// 	plan: 'Free',
				// 	requests: 2271,
				// 	resources: 618,
			},
		});

		report = api._elm;

		bandwidthSect = report.getElementById("report-bandwidth");
		bandwidthSectTitle = bandwidthSect.getElementById("item-title");
		bandwidthSectSubTitle = bandwidthSect.getElementById("item-subtitle");

		storageSect = report.getElementById("report-storage");
		storageSectTitle = storageSect.getElementById("item-title");
		storageSectSubTitle = storageSect.getElementById("item-subtitle");

		transSect = report.getElementById("report-trans");
		transSectTitle = transSect.getElementById("item-title");
		transSectSubtTitle = transSect.getElementById("item-subtitle");
	}

	return api;
}