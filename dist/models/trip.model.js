"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DB_URL = "mongodb://localhost:27017";
mongoose_1.default.connect(DB_URL).then(() => console.log('mongodb server start'));
const tripSchema = new mongoose_1.default.Schema({
    deprature: { type: String, required: true },
    destination: { type: String, required: true },
    startingDate: { type: Date, required: true },
    duration: { type: String, required: true },
    passengers: { type: Number, required: true }
});
exports.Trip = mongoose_1.default.model('Trip', tripSchema);
