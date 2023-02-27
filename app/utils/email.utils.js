const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");

// Configure AWS SES Credentials
AWS.config.update({
	region: "us-east-1",
	accessKeyId: "AKIARKCUO56XS2KNOQKF",
	secretAccessKey: "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",
});

const SES = new AWS.SES({ apiVersion: "2010-12-01" });

const buildEmailOptions = ({ emailFrom, emailTo, subject, text, html, fileName }) => {
	return {
		from: emailFrom, // sender address
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

const verifyEmailInAWS = async (email) => {
	try {
		const params = {
			Identities: [email],
		};

		const data = await SES.getIdentityVerificationAttributes(params).promise();
		const identityInfo = data.VerificationAttributes[email];

		// If already verified
		if (identityInfo && identityInfo.VerificationStatus === "Success") {
			console.log("La dirección de correo electrónico ya está verificada");
			return { status: "success", message: "La dirección de correo electrónico ya está verificada" };
		} else {
			console.log("La dirección de correo electrónico no está verificada");
			const verifyParams = {
				EmailAddress: email,
			};

			const result = await SES.verifyEmailIdentity(verifyParams).promise();
			console.log("Solicitud de verificación enviada: ", result);
			return { status: "success", message: "Solicitud de verificación enviada al correo:" + email };
		}
	} catch (error) {
		console.error(error);
		return { status: "error", message: error.message };
	}
};

const sendEmail = async (mailOptions) => {
	// Create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		SES,
	});

	let info = await transporter.sendMail(mailOptions);
	console.log("Email sent successfully:", info.response);

	return { message: "Email sent successfully." };
};

module.exports = {
	verifyEmailInAWS,
	sendEmail,
	buildEmailOptions,
};
