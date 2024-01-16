import { MailerService } from "@nestjs-modules/mailer"
import { Injectable } from "@nestjs/common"

import { User } from "src/auth/entities/auth.entity"

interface Payload {
	email: string
	firstName: string
}

@Injectable()
export class MailService {
	constructor(private readonly mailerService: MailerService) {}

	async test(payload: Payload) {
		const token = (Math.random() + 1).toString(32).substring(2)
		const url = `${process.env.APP_URI}/test?token=${token}`

		return await this.mailerService.sendMail({
			to: payload.email,
			subject: "Welcome to TraxoHQ! Veriy your mail.",
			template: "./test",
			context: {
				name: payload.firstName,
				email: payload.email,
				url,
			},
		})
	}

	async confirmationMail(user: User, token: string) {
		const url = `${process.env.APP_URI}/confirm?token=${token}`

		await this.mailerService.sendMail({
			to: user.email,
			subject: "Welcome to TraxoHQ! Veriy your mail.",
			template: "./confirmation",
			context: {
				name: user.firstName,
				email: user.email,
				url,
			},
		})
	}

	async passwordResetMail(user: User, token: string) {
		const url = `${process.env.APP_URI}/reset?token=${token}`

		await this.mailerService.sendMail({
			to: user.email,
			subject: "Let's reset your password.",
			template: "./password-reset",
			context: {
				name: user.firstName,
				email: user.email,
				url,
			},
		})
	}
}
