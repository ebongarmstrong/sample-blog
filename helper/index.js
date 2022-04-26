// helper/index.js


module.exports = {
	replaceText: (text, pattern, replaceWith) => {
		const rep = text.replace(pattern, replaceWith);
		return rep
	}
}
