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
	transSectSubTitle = null,
	planText = null,
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
				transSectSubTitle.text = data.transformationsPercent;

				// planText.text = data.plan;
				// derived: 1525,
				// 	plan: 'Free',
				// 	requests: 2271,
				// 	resources: 618,



				/* PLANS:

				free: "Free"
				basic: "Basic"
				plus: "Plus"
				advanced: "Advanced"
				advanced_extra: "Advanced Extra"
				premium: "Premium"*/
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
		transSectSubTitle = transSect.getElementById("item-subtitle");

		// planText = report.getElementById("data-plan");
	}

	return api;
}