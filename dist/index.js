"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trip_route_1 = __importDefault(require("./routes/trip.route"));
const err_middleware_1 = __importDefault(require("./middlewares/err.middleware"));
const port = 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', trip_route_1.default);
app.use(err_middleware_1.default);
app.listen(port, () => {
    console.log("listen on port " + port);
});
