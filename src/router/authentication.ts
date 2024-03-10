import express from 'express';

import { register } from '../controllers/authentication';

const router = express.Router();

export default (router: express.Router) => {
    router.post('/auth/register', register);
}