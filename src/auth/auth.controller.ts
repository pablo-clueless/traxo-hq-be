import { Controller, Post, Body } from "@nestjs/common"

import { CreateUserDto } from "./dto/create-auth.dto"
import { AuthService } from "./auth.service"
import { SigninDto } from "./dto/signin.dto"

interface Payload {
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

	@Post("test")
	test(@Body() payload: Payload) {
		return this.authService.test(payload)
	}
}
