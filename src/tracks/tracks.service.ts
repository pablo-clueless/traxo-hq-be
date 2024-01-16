import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common"

import { CreateTrackDto } from "./dto/create-track.dto"
import { UpdateTrackDto } from "./dto/update-track.dto"
import { PaginateDto } from "./dto/paginate.dto"
import { Track } from "./entities/track.entity"

@Injectable()
export class TracksService {
	constructor(@InjectModel("Track") private readonly trackModel: Model<Track>) {}

	async create(createTrackDto: CreateTrackDto) {
		try {
			const isExistingTrack = await this.trackModel.findOne({
				where: { name: createTrackDto.name },
			})
			if (isExistingTrack) {
				throw new BadRequestException("Track already exists")
			}
			const createdTrack = new this.trackModel({ ...createTrackDto })
			const track = await createdTrack.save()
			return track
		} catch (error) {
			throw new BadRequestException(error, "internal server error")
		}
	}

	async findAll(query: PaginateDto) {
		try {
			const { limit, page } = query
			const pageLimit = Math.min(Number(limit), 100)
			const offset = 0 + (Math.abs(page || 1) - 1) * pageLimit
			const count = await this.trackModel.find({}).countDocuments()
			const tracks = await this.trackModel.find().skip(offset).limit(pageLimit)
			return {
				tracks,
				pagination: {
					currentPage: Math.abs(page || 1),
					pageSize: pageLimit,
					total: count,
					pageCount: Math.ceil(count / pageLimit),
				},
			}
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async findOne(id: string) {
		try {
			const track = await this.trackModel.findById(id)
			if (!track) {
				throw new NotFoundException("Track does not exists")
			}
			return track
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async update(id: string, updateTrackDto: UpdateTrackDto) {
		try {
			const isExistingTrack = await this.trackModel.findById(id)
			if (!isExistingTrack) {
				throw new NotFoundException("Track does not exists")
			}
			const updatedtrack = await this.trackModel.findByIdAndUpdate(
				id,
				{ ...updateTrackDto },
				{ new: true }
			)
			return updatedtrack
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}

	async remove(id: number) {
		try {
			const removedTrack = await this.trackModel.findByIdAndRemove(id)
			return removedTrack
		} catch (error) {
			throw new BadRequestException(error, "Internal server error")
		}
	}
}
