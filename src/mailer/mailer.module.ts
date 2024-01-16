import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { MailerModule } from "@nestjs-modules/mailer"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"
import { join } from "path"

import { MailService } from "./mailer.service"

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.SMTP_HOST,
				secure: false,
				auth: {
					pass: process.env.SMTP_PASS,
					user: process.env.SMTP_USER,
				},
			},
			defaults: {
				from: "noreply@traxo-hq.vercel.app",
			},
			template: {
				dir: join(__dirname, "templates"),
				adapter: new HandlebarsAdapter(),
			},
		}),
	],
	providers: [ConfigService, MailService],
	exports: [MailService],
})
export class MailModule {}
