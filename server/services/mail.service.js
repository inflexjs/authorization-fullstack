import nodemailer from 'nodemailer'

const mailOptions = {
	SENDINBLUE_SMTP_HOST: 'smtp-relay.sendinblue.com',
	SENDINBLUE_SMTP_PORT: 587,
	SENDINBLUE_SMTP_USER: 'auth.freedman@gmail.com',
	SENDINBLUE_SMTP_PASSWORD: 'zK4mU5BbnWEgwcIh'
}

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: mailOptions.SENDINBLUE_SMTP_HOST,
			port: mailOptions.SENDINBLUE_SMTP_PORT,
			secure: false,
			auth: {
				user: mailOptions.SENDINBLUE_SMTP_USER,
				pass: mailOptions.SENDINBLUE_SMTP_PASSWORD,
			}
		})
	}

	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: mailOptions.SENDINBLUE_SMTP_USER,
			to,
			subject: `Активация аккаунта на ${process.env.APP_URL}`,
			text: '',
			html:
				`
					<table width="100%" align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" data-mobile="true">
						<tbody>
							<tr>
								<td valign="top" align="center" style="padding:0;margin:0;">
									<table bgcolor="#ffffff" align="center" border="0" cellspacing="0" cellpadding="0" width="605" style="border-left-width:20px;border-right-width:20px;border-right-style:solid;border-left-style:solid;border-right-color:#ffffff;border-left-color:#ffffff;">
										<tbody>
											<tr>
												<td align="left" valign="top" style="padding:0;margin:0;">
													<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="padding:0;margin:0;" data-editable="text">
														<tbody>
															<tr>
																<td valign="top" align="left" style="padding-top:20px;padding-right:0px;padding-bottom:0;padding-left:0px;margin:0;">
																	<span style="font-family:Arial,sans-serif;color:#2b5d2e;font-size:28px;font-weight:bold;">
																		Подтвердите аккаунт перейдя по ссылке ниже
																	</span><br>
																	<a href="${link}" style="font-family:Arial,sans-serif;color:#74c044;font-size:16px;font-weight:bold;">
																		${link}
																	</a>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>		
										</tbody>
									</table>
									<br>
									<table width="300" border="0" cellpadding="0" cellspacing="0" align="center" style="border-collapse:separate;">
										<tbody>
											<tr>
												<td valign="top" style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 10px 0 10px 0;">
													<table border="0" width="101" align="center" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
														<tbody>
															<tr>
																<td width="101" align="right" valign="top" style="font-family:Arial,Helvetica,sans-serif;margin:0;padding-top:3px;padding-right:0;padding-right:0;padding-bottom:0;padding-left:0;font-size:7px;text-align: left;">
																	<span style="color:#939598;text-transform:uppercase;">Powered by ${process.env.APP_URL}</span>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				`
		})
	}
}

export default new MailService()