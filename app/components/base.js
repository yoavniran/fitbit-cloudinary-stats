import document from "document";

export default (selector, methods = {}) => {

	const elm = document.getElementById(selector);

	return {
		_elm: elm,
		show: () => {
			elm.style.display = "inline"
		},
		hide: () => {
			elm.style.display = "none"
		},
		...methods
	};
}