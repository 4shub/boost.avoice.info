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

app.get('/', (req: Request, res: Response) => {
    const host = req.hostname.includes('local') ? 'local' : 'boost';

    if (host === 'boost') {
        res.redirect('/minneapolis');
        return;
    }

    res.send(404);
});

app.get('/:service', (req: Request, res: Response) => {

    const host = req.hostname.includes('local') ? 'local' : 'boost';

    const template = templates[host][req.params.service];

    if (!template) {
        return res.sendStatus(404);
    }

    const payload: AppProps = {
        host,
        currentPath: req.params.service,
        cities: host === 'boost' ? Object.keys(templates[host]) : [],
        emailTemplates: template.data,
    };

    const content = ReactDOM.renderToString(React.createElement(App, payload));

    res.send(renderIndex(content, payload));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
