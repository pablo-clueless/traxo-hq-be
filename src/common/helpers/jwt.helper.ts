import { ForbiddenException, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class JwtHelper {
	constructor(
		private jwtService: JwtService,
		private configService: ConfigService
	) {}

	async sign(payload: { userId: any }) {
		try {
			return this.jwtService.sign(payload, {
				secret: await this.configService.get("JWT_SECRET"),
			})
		} catch (error) {
			throw new ForbiddenException(error)
		}
	}

	async verify(token: string) {
		try {
			return this.jwtService.verify(token)
		} catch (error) {
			throw new ForbiddenException(error)
		}
	}
}
