import { Controller, Post, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BinModel } from '../Models/Bin';

@Controller('api')
export class BinController {
	@Post('')
	private async postRoot(req: Request, res: Response) {
		const { access } = req.headers;

		if (access !== process.env.access)
			return res.status(400).json({ error: 'Access denied.' });

		const bin = new BinModel(req.body),
			payload = bin.save();

		return res.json(payload);
	}
	@Get('')
	private async getRoot(req: Request, res: Response) {
		const { access } = req.headers;

		if (access !== process.env.access)
			return res.status(400).json({ error: 'Access denied.' });

		const bin = await BinModel.findOne({ id: req.params.id });

		if (!bin) {
			return res.json({ error: 'Bin not found. ' });
		}

		res.json(bin);

		return BinModel.findOneAndUpdate(bin, {
			$push: { viewed: req.headers['x-forwarded-for'] }
		});
	}
	@Get('all')
	private async getAll(req: Request, res: Response) {
		const { token } = req.headers;

		if (token !== process.env.MASTER) {
			return res.status(404);
		}

		const bins = await BinModel.find();

		return res.json(bins);
	}
}
