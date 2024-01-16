import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

import { LoggerMiddleware } from "./common/middlewares/logger.middleware"
import { JwtHelper } from "./common/helpers/jwt.helper"
import { SocketGateway } from "./socket/socket.gateway"
import { SocketService } from "./socket/socket.service"
import { SocketModule } from "./socket/socket.module"
import { TracksModule } from "./tracks/tracks.module"
import { MailModule } from "./mailer/mailer.module"
import { AppController } from "./app.controller"
import { AuthModule } from "./auth/auth.module"
import { AppService } from "./app.service"

@Global()
@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI, {
			pass: process.env.MONGO_PASS,
			user: process.env.MONGO_USER,
		}),
		TracksModule,
		AuthModule,
		SocketModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtHelper, JwtService, SocketGateway, SocketService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("*")
	}
}
