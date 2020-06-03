import express, { Request, Response } from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import App from '../app/app';
import renderIndex from './util/render-index';
import templates from '../../dist/template-data.json';
import { AppProps } from '../app/app.types';

const app = express();
const port = 3216;

app.use(express.static('dist'));

app.get('/', (req: Request, res: Response) => res.redirect('/minneapolis'));

app.get('/:service', (req: Request, res: Response) => {
    if (!templates[req.params.service]) {
        return res.sendStatus(404);
    }

    const payload: AppProps = {
        currentPath: req.params.service,
        cities: Object.keys(templates),
        emailTemplates: templates[req.params.service].data,
    };

    const content = ReactDOM.renderToString(React.createElement(App, payload));

    res.send(renderIndex(content, payload));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
