import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, collection: 'users' })
export class User {
    _id: Types.ObjectId;

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    name: string;

    @Prop({
        type: SchemaTypes.Number,
        required: true
    })
    age: string;

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    email: string

}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;