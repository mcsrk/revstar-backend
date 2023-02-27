const nodemailer = require("nodemailer");

const buildEmailOptions = ({ emailTo, subject, text, html, fileName }) => {
	return {
		from: "foo@example.com", // sender address
		to: emailTo, // list of receivers
		subject: subject, // Subject line
		text, // plain text body
		html, // html body
		attachments: [
			{
				filename: `${fileName}.pdf`,
				path: `${fileName}.pdf`,
				contentType: "application/pdf",
			},
		],
	};
};

const sendEmail = async (mailOptions) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "7594c769fd6c27", // Fake credential from Mailtrap
			pass: "f9cc630b65b57d",
		},
	});

	// send mail with defined transport object

	let info = await transporter.sendMail(mailOptions);
	console.log("Email sent successfully:", info.response);

	return { message: "Email sent successfully." };
};

module.exports = {
	sendEmail,
	buildEmailOptions,
};
