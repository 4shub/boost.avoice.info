import { AppProps } from '../../app/app.types';

export const embedJSON = (title: string, obj: Record<any, any>) =>
    obj ? `window.__${title}__ = ${JSON.stringify(obj).replace(/</g, '\\\u003c')};` : '';

const renderIndex = (content: string, payload: AppProps) => `
    <html lang="en">
        <head>
            <title>#blacklivesmatter</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="./app.css" rel="stylesheet" />
        </head>
        <body>  
            <script>
                ${embedJSON('APP_PROPS', payload)}
            </script>
            <div id="app">${content}</div>
            
            <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
            <script src="./app.js"></script>
            <!-- Open source analytics tracker -->
            <script>
                (function(f, a, t, h, o, m){
                    a[h]=a[h]||function(){
                        (a[h].q=a[h].q||[]).push(arguments)
                    };
                    o=f.createElement('script'),
                        m=f.getElementsByTagName('script')[0];
                    o.async=1; o.src=t; o.id='fathom-script';
                    m.parentNode.insertBefore(o,m)
                })(document, window, '//analytics.shub.club/tracker.js', 'fathom');
                fathom('set', 'siteId', 'VSHXO');
                fathom('trackPageview');
            </script>
            <!-- / Fathom -->
        </body>
    </html>
`;

export default renderIndex;
