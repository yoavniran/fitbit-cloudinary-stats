import {getFileSize} from "../common/utils";

const DOMAIN = "https://api.cloudinary.com/",
	REPORT = "usage",
	SEARCH = "resources/search",
	LATEST_MAX = 5,
	IMG_PATH = "image/",
	IMG_TRANSFORM = "w_696,h_500,c_pad,b_auto";

const makeApiRequest = (resource, options, data = null) => {
	const url = [DOMAIN, "v1_1", options.cloud, resource].join("/"),
		auth = btoa(`${options.apikey}:${options.secret}`);

	console.log("about to make request to: ", url);

	return fetch(url, {
		method: options.method || "GET",
		headers: new Headers({
			"Content-Type": "application/json",
			Authorization: `Basic ${auth}`
		}),
		body: data ? JSON.stringify(data) : undefined,
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


const getImageUrl = (url) => {
	const index = url.indexOf(IMG_PATH) + IMG_PATH.length;

	if (~index) {
		const next = index + url.substr(index).indexOf("/");

		url = url.substr(0, (next + 1)) +
			IMG_TRANSFORM +
			url.substr(next);
	}

	return url;
};

const fetchLatestForTag = (tag, options) =>
	makeApiRequest(SEARCH, {
		...options,
		method: "POST"
	}, {
		expression: `resource_type:image AND tags = ${tag}`,
		max_results: LATEST_MAX,
		sort_by: [{"uploaded_at": "desc"}],
	})
		.then((result) => result.resources.map((r) => ({
			url: getImageUrl(r.secure_url),
			id: r.public_id
		})));

export {
	fetchReport,
	fetchLatestForTag,
}