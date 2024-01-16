import { WsException } from "@nestjs/websockets"
import { Injectable } from "@nestjs/common"
import { Socket } from "socket.io"

import { JwtHelper } from "src/common/helpers/jwt.helper"

@Injectable()
export class SocketService {
	constructor(private readonly jwtHelper: JwtHelper) {}

	private readonly connectedClients: Map<string, Socket> = new Map()

	handleConnection(socket: Socket): void {
		const clientId = socket.id
		this.connectedClients.set(clientId, socket)

		socket.on("disconnect", () => {
			this.connectedClients.delete(clientId)
		})
	}

	handleDisconnection(socket: Socket): void {
		socket.disconnect()
	}

	async getUserFromToken(socket: Socket) {
		let token = socket.handshake.headers.authorization
		token = token.split(" ")[1]
		const user = await this.jwtHelper.verify(token)
		if (!user) {
			throw new WsException("Invalid credentials!")
		}
		return user
	}
}
