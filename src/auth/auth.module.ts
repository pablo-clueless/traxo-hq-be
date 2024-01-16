import { JwtModule, JwtService } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { JwtHelper } from "src/common/helpers/jwt.helper"
import { MailModule } from "src/mailer/mailer.module"
import { UserSchema } from "./entities/auth.entity"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		JwtModule.register({
			global: true,
			publicKey: "PUBLIC_KEY",
			privateKey: "PRIVATE_KEY",
			signOptions: { expiresIn: 604800 },
		}),
		MailModule,
	],
	controllers: [AuthController],
	providers: [AuthService, ConfigService, JwtHelper, JwtService],
	exports: [AuthService, JwtService],
})
export class AuthModule {}
