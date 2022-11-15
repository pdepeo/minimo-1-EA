import { Schema, model } from "mongoose";

const Valoracion = new Schema({
    puntos: String,
    comment: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

export default model('Valoracion', Valoracion)