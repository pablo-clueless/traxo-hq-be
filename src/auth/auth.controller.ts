import { Controller, Post, Body, Patch } from "@nestjs/common"

import { CreateUserDto } from "./dto/create-auth.dto"
import { AuthService } from "./auth.service"
import { SigninDto } from "./dto/signin.dto"
import { ResetDto } from "./dto/reset-dto"

interface TestPayload {
	email: string
	firstName: string
}

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("signup")
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signup(createUserDto)
	}

	@Post("signin")
	signin(@Body() signinDto: SigninDto) {
		return this.authService.signin(signinDto)
	}

	@Post("forgot-password")
	forgotPassword(@Body() email: string) {
		return this.authService.forgotPassword(email)
	}

	@Patch("reset-password")
	resetPassword(@Body() payload: ResetDto) {
		return this.authService.resetPassword(payload)
	}

	@Post("test")
	test(@Body() payload: TestPayload) {
		return this.authService.test(payload)
	}
}
