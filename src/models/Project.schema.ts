import mongoose, { Schema, Document, PopulatedDoc, Types } from 'mongoose';
import { ITask } from './Task.schema';


// export type ProjectType = Document & {
//     projectName: string,
//     clientName: string,
//     description: string
// }

export interface IProject extends Document {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[] 
    // tasks: ITask[]
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    tasks : [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, 
{
    timestamps: true
});

//Registramos el modelo en la instancia de mongoose
const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;