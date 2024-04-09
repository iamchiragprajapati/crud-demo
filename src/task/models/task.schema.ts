import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { TaskStatus } from "../dto/task.dto";

@Schema({ timestamps: true, collection: 'tasks' })
export class Task {
    _id: Types.ObjectId;

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    title: string;

    @Prop({
        type: SchemaTypes.String,
        required: true,
        unique: true
    })
    description: string;

    @Prop({
        type: SchemaTypes.String,
        required: true
    })
    status: TaskStatus

}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = HydratedDocument<Task>;