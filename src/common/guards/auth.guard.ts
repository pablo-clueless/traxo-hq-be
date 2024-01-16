import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common"

@Injectable()
export class AuthenticationGuard implements CanActivate {
	constructor(private jwtservice: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractTokenFromHeader(request)
		if (!token) throw new UnauthorizedException()
		try {
			const payload = await this.jwtservice.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			})
			request["user"] = payload
		} catch (error) {
			throw new UnauthorizedException(error)
		}
		return true
	}

	private extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization.split(" ") ?? []
		return type === "Bearer" ? token : undefined
	}
}
