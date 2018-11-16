import {outbox} from "file-transfer"

export default ({url, id}, prefix) =>
	fetch(url).then((response) => {
		return response.arrayBuffer(); // We need an arrayBuffer of the file contents
	})
		.then((data) => {
			outbox.enqueue(`${prefix}_${id}`, data) // Queue the file for transfer
				.then(() => {
					// console.log(`Transfer of '${id}' successfully queued.`);
				})
				.catch((error) => {
					console.log(`Failed to queue '${id}'. Error: `, error);
				})
		})
		.catch((error) => {
			console.log(`fetching file failed !!!`, error);
		});
