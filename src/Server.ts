// Main Imports
import { Server } from '@overnightjs/core';
import { connect } from 'mongoose';
import { Express } from 'express-serve-static-core';

// Middleware
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

// Controllers
import { BinController } from './Controllers/BinController';

//

export class Main extends Server {
	public app!: Express;
	constructor() {
		super(process.env.NODE_ENV === 'development');

		this.app.use(json());
		this.app.use(urlencoded({ extended: true }));

		this.app.use(cors());

		this.setupControllers();
	}
	private setupControllers() {
		const binController = new BinController();

		super.addControllers([binController]);
	}
	public async start(port: number) {
		await connect(
			process.env.MONGODB!,
			{
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true
			}
		);

		this.app.listen(port, () =>
			console.log('App listening on port ' + port)
		);
	}
}
