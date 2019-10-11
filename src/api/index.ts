import express from 'express';
import bodyParser from 'body-parser';

import { RegisterInput } from '../app/register/register.in';

const expressApp: express.Application = express();
expressApp.use(bodyParser);


const register = async (input: )

expressApp.post('/user', async (req, res) => {
    
    try {
        const output: RegisterPresenterOutput = register(input);
        res.json(output);
    } catch(e) {
        res.end(e.toString());
    }
});

expressApp.listen(3000, () => {
    console.log('Express listening on 3000');
})