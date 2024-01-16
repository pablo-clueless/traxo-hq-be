import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose"

import { Track } from "src/tracks/entities/track.entity"

@Schema({ timestamps: true })
export class User {
	@Prop()
	firstName: string

	@Prop()
	lastName: string

	@Prop({ unique: true })
	email: string

	@Prop()
	phone: string

	@Prop()
	password: string

	@Prop()
	gender: string

	@Prop()
	dateOfBirth: string

	@Prop()
	educationLevel: string

	@Prop()
	employmentStatus: string

	@Prop()
	country: string

	@Prop()
	state: string

	@Prop({ type: Types.ObjectId, ref: "Track" })
	track: Track

	@Prop()
	course: string

	@Prop({ unique: true, expires: 1800 })
	token: string
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
