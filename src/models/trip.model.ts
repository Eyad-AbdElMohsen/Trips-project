import mongoose, { Model, Schema, Document } from "mongoose"

const DB_URL = "mongodb://localhost:27017"


mongoose.connect(DB_URL).then(()=> console.log('mongodb server start')) 


const tripSchema: Schema = new mongoose.Schema({
    deprature: { type: String, required: true },
    destination: { type: String, required: true },
    startingDate: { type: Date, required: true },
    duration: { type: String, required: true },
    passengers: {type: Number, required: true}
});

export interface ITrip extends Document{
    deprature: string,
    destination: string,
    startingDate: Date,
    duration: string,
    passengers: number
}

export const Trip: Model<ITrip> = mongoose.model<ITrip>('Trip', tripSchema);