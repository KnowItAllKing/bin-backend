import { config } from 'dotenv';
import { Main } from './Server';

config();

const server = new Main();

server.start(5000);
