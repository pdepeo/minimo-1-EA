import { Schema, model, SchemaType, SchemaTypes } from 'mongoose';

const User = new Schema({
	name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String,
	valoraciones: [{type: Schema.Types.ObjectId, ref: 'Valoracion'}]
});

export default model('User', User);

