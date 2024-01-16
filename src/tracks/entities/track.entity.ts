import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema({ timestamps: true })
export class Track {
	@Prop()
	name: string

	@Prop()
	description: string

	@Prop()
	courses: string[]
}

export type TrackDocument = Track & Document
export const TrackSchema = SchemaFactory.createForClass(Track)
