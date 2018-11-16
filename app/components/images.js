import initComponent from "./base";

let images = null,
	api = null,
	elms = null;

export default () => {
	if (!images) {
		api = initComponent("tag-images-container", {
			showImage: (path) => {
				api.show();
				const m = /(\d)\.txi/.exec(path);

				if (m && m[1]) {
					const index = parseInt(m[1]);
					elms[index].image = path;
					elms[index].parent.display = "inline";
				}
			}
		});

		images = api._elm;
	}

	elms = images.getElementsByTagName("image");

	return api;
}