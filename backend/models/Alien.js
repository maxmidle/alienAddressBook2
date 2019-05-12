import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Alien = new Schema({
	userId: { type: String, required: true },
	userPw: { type: String, required: true },
	name: { type: String, required: true },
	age: { type: Number, required: false },
	family: { type: String, required: false},
	kind: { type: String, required: false },
	planet: { type: String, required: false },
	contacts: { type: Array, required: false},
});

export default mongoose.model('Alien', Alien);