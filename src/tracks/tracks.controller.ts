import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common"

import { AuthenticationGuard } from "src/common/guards/auth.guard"
import { CreateTrackDto } from "./dto/create-track.dto"
import { UpdateTrackDto } from "./dto/update-track.dto"
import { TracksService } from "./tracks.service"
import { PaginateDto } from "./dto/paginate.dto"

@Controller("tracks")
export class TracksController {
	constructor(private readonly tracksService: TracksService) {}

	@UseGuards(AuthenticationGuard)
	@Post("new")
	create(@Body() createTrackDto: CreateTrackDto) {
		return this.tracksService.create(createTrackDto)
	}

	@Get()
	findAll(@Query() query: PaginateDto) {
		return this.tracksService.findAll(query)
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.tracksService.findOne(id)
	}

	@UseGuards(AuthenticationGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateTrackDto: UpdateTrackDto) {
		return this.tracksService.update(id, updateTrackDto)
	}

	@UseGuards(AuthenticationGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.tracksService.remove(+id)
	}
}
