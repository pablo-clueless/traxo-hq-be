import { ConfigService } from "@nestjs/config"
import { Module } from "@nestjs/common"

import { SocketGateway } from "src/socket/socket.gateway"
import { JwtHelper } from "src/common/helpers/jwt.helper"
import { SocketService } from "./socket.service"

@Module({
	providers: [ConfigService, JwtHelper, SocketGateway, SocketService],
})
export class SocketModule {}
