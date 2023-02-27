const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePdf = async (data, fileName) => {
	const doc = new PDFDocument();
	const writeStream = fs.createWriteStream(`${fileName}.pdf`);
	doc.pipe(writeStream);

	data.forEach((row) => {
		doc.text(row.name + " " + row.description + " " + row.price);
	});

	doc.end();
};

module.exports = {
	generatePdf,
};
