import { Server, Socket } from "socket.io"
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets"

import { SocketService } from "./socket.service"

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private server: Server

	constructor(private readonly socketService: SocketService) {}

	handleConnection(client: Socket) {
		this.socketService.handleConnection(client)
	}

	handleDisconnect(client: Socket) {
		this.socketService.handleDisconnection(client)
	}

	@SubscribeMessage("send_message")
	async handleMessage(
		@MessageBody() data: string,
		@ConnectedSocket() client: Socket
	) {
		const user = await this.socketService.getUserFromToken(client)
		this.server.sockets.emit("recieve_message", data, user)
	}
}
