import express from 'express';

import { getUsersByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

export const register = async (req:express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        
        const existingUser = await getUsersByEmail(email);
        
        if (existingUser.length > 0) {
            return res.sendStatus(409);
            // The HTTP status code specifically indicates that there's a conflict with the current state of the resource, which in this case is the username.
        }

        const salt = random();
        const user = await createUser({
            email, 
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }, 
        })
        
        return res.status(200).json(user).end();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}