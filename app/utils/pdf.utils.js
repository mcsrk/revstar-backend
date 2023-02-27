const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePdf = async (data, fileName, inventoryName, companyName) => {
	const doc = new PDFDocument();
	const writeStream = fs.createWriteStream(`${fileName}.pdf`);
	doc.pipe(writeStream);

	const tableHeaders = ["ID", "Nombre", "Descripción", "Precio", "Stock"];
	const tableData = data.map((row) => [
		row.id,
		row.name,
		row.description || "-----",
		row.price,
		row.stock !== undefined ? row.stock : 0,
	]);

	// Define table style
	doc.font("Helvetica-Bold");
	const tableTop = 120;
	const rowHeight = 30;
	const cellMargin = 10;
	const tableWidth = doc.page.width - 100;
	const cellWidth = tableWidth / tableHeaders.length;

	// Add document title
	doc
		.font("Helvetica-Bold")
		.fontSize(16)
		.text(`Productos del inventario ${inventoryName} de la empresa ${companyName}`, 50, 50);

	// Add date label
	const date = new Date();
	const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
	doc.fontSize(10).text(`Fecha de generación: ${dateString}`, {
		align: "right",
		width: tableWidth,
		lineGap: 5,
	});

	// Add table headers
	let y = tableTop;
	tableHeaders.forEach((header, i) => {
		doc.text(header, 50 + i * cellWidth, y);
	});
	y += rowHeight;

	// Add table data
	tableData.forEach((rowData) => {
		rowData.forEach((cellData, i) => {
			doc.text(cellData.toString(), 50 + i * cellWidth + cellMargin, y);
		});
		y += rowHeight;
	});

	doc.end();
};

module.exports = {
	generatePdf,
};
