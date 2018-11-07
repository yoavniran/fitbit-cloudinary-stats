import {FILE_SIZES} from "./consts";

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
const getFileSize = (size) =>{
	const k = 1024,
		i = Math.floor(Math.log(size) / Math.log(k));

	return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${FILE_SIZES[i]}`;
};


export {
	getFileSize,
}