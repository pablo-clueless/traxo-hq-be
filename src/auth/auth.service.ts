import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import * as bcrypt from "bcrypt"
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common"

import { JwtHelper } from "src/common/helpers/jwt.helper"
import { MailService } from "src/mailer/mailer.service"
import { CreateUserDto } from "./dto/create-auth.dto"
import { User } from "./entities/auth.entity"
import { SigninDto } from "./dto/signin.dto"
import { ResetDto } from "./dto/reset-dto"

interface Payload {
	email: string
	firstName: string
}

@Injectable()
export class AuthService {
	constructor(
		@InjectModel("User") private readonly userModel: Model<User>,
		private jwtHelper: JwtHelper,
		private mailerService: MailService
	) {}

	async signup(createUserDto: CreateUserDto) {
		try {
			const isExisitngUser = await this.userModel.findOne({
				email: createUserDto.email,
			})
			if (isExisitngUser) {
				throw new BadRequestException("User exists already!")
			}
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(createUserDto.password, salt)
			const token = (Math.random() + 1).toString(32).substring(2)
			const createdUser = await this.userModel.create({
				...createUserDto,
				password: hashedPassword,
				token,
			})
			const user = await createdUser.save()
			await this.mailerService.confirmationMail(user, token)
			return { message: "User created sucessfully!", user }
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async signin(signinDto: SigninDto) {
		try {
			const { email, password } = signinDto
			const isExisitngUser = await this.userModel.findOne({ email })
			if (!isExisitngUser) {
				throw new NotFoundException("User does not exists!")
			}
			const isPasswordMatch = await bcrypt.compare(
				password,
				isExisitngUser.password
			)
			if (!isPasswordMatch) {
				throw new UnauthorizedException("Incorrect password!")
			}
			const payload = { userId: isExisitngUser._id }
			return {
				message: "Sign in successful!",
				token: await this.jwtHelper.sign(payload),
				user: isExisitngUser,
			}
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async verify(token: string) {
		try {
			const user = await this.userModel.findOne({ token })
			if (!user) {
				throw new BadRequestException("This token has expired!")
			}
			return { messagfe: "User verified!" }
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async forgotPassword(email: string) {
		try {
			const user = await this.userModel.findOne({ email })
			if (!user) {
				throw new NotFoundException("User does not exists!")
			}
			const token = (Math.random() + 1).toString(32).substring(2)
			await this.userModel.updateOne({ email }, { token })
			await this.mailerService.passwordResetMail(user, token)
			return { message: "Reset password mail sent!" }
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async resetPassword(payload: ResetDto) {
		try {
			const { password, token } = payload
			const user = await this.userModel.findOne({ token })
			if (!user) {
				throw new BadRequestException("This token has expired!")
			}
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(password, salt)
			await this.userModel.updateOne({ token }, { password: hashedPassword })
			return { message: "Password reset successful!" }
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async test(payload: Payload) {
		try {
			return await this.mailerService.test(payload)
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}
}
