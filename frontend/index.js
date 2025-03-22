const root = document.createElement('div');
root.id = 'root';

document.body.appendChild(root);

document.title = 'Vite + React';

document.documentElement.lang = 'en';

document.head.innerHTML = `
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
`;

const script = document.createElement('script');
script.type = 'module';
script.src = '/src/main.jsx';

document.body.appendChild(script);
