import { Schema, model, Document } from 'mongoose';
import { BinType } from '../Types/BinType';

const bin = new Schema({
	code: {
		type: String,
		required: true
	},
	ID: {
		type: String,
		unique: true
	},
	ip: {
		type: String,
		required: true
	},
	viewed: {
		type: Array,
		default: []
	},
	lang: {
		type: String,
		required: true
	}
});

export const BinModel = model<BinDoc>('Bin', bin);

interface BinDoc extends Document, BinType {}

export class Bin {
	public code!: string;
	public ID!: string;
	public ip!: string;
	public viewed?: string[];
	public lang!: string;
	public doc: BinDoc;
	constructor(options: BinType) {
		Object.assign(this, options);
		this.doc = new BinModel(options);
	}
	async save() {
		this.doc = await this.doc.save();
		return this;
	}
}
