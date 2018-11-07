import {getFileSize} from "../common/utils";

const DOMAIN = "https://api.cloudinary.com/",
	REPORT = "usage";

const makeApiRequest = (resource, options) => {
	const url = [DOMAIN, "v1_1", options.cloud, resource].join("/"),
		auth = btoa(`${options.apikey}:${options.secret}`);

	console.log("about to make request to: ", url);

	return fetch(url, {
		headers: new Headers({
			"Content-Type": "application/json",
			Authorization: `Basic ${auth}`
		}),
	})
		.then((response) => response.json());
};

const fetchReport = (options) =>
	makeApiRequest(REPORT, options)
		.then((result) => {
			return {
				plan: result.plan,
				updated: result.last_updated,
				derived: result.derived_resources,
				requests: result.requests,
				resources: result.resources,
				bandWidth: `${getFileSize(result.bandwidth.usage)} / ${getFileSize(result.bandwidth.limit)}`,
				bandWidthPercent: `${result.bandwidth.used_percent}%`,
				storage: `${getFileSize(result.storage.usage)} / ${getFileSize(result.storage.limit)}`,
				storagePercent: `${result.storage.used_percent}%`,
				transformations: `${result.transformations.usage} / ${result.transformations.limit}`,
				transformationsPercent: `${result.transformations.used_percent}%`,
			};
		})
		.catch((reason) => {
			return {
				error: true,
				reason
			};
		});

export {
	fetchReport,
}