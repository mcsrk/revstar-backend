const nodemailer = require("nodemailer");
const AWS = require("aws-sdk");
const CONFIG_AWS = require("config/aws.config.js");
const CONFIG_EMAIL = require("config/email.config.js");

// Configure AWS SES Credentials
AWS.config.update({
	region: CONFIG_AWS.region,
	accessKeyId: CONFIG_AWS.accessKeyId,
	secretAccessKey: CONFIG_AWS.secretAccessKey,
});

const SES = new AWS.SES({ apiVersion: "2010-12-01" });

const buildEmailOptions = ({ emailTo, subject, text, html, fileName }) => {
	return {
		from: CONFIG_EMAIL.senderEmail, // sender address
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
			console.log("Email ya verificado");
		} else {
			console.log("Email no verificado");
			const verifyParams = {
				EmailAddress: email,
			};

			const result = await SES.verifyEmailIdentity(verifyParams).promise();
			console.log("Solicitud de verificación enviada: ", result);
			return { code: 422, status: "pending", message: "Verification request sent to: " + email };
		}
	} catch (error) {
		console.error(error);
		return { status: "error", message: error };
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
