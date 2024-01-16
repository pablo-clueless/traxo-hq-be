import { MongooseModule } from "@nestjs/mongoose"
import { JwtService } from "@nestjs/jwt"
import { Module } from "@nestjs/common"

import { TracksController } from "./tracks.controller"
import { TrackSchema } from "./entities/track.entity"
import { TracksService } from "./tracks.service"

@Module({
	imports: [MongooseModule.forFeature([{ name: "Track", schema: TrackSchema }])],
	controllers: [TracksController],
	providers: [TracksService, JwtService],
})
export class TracksModule {}
