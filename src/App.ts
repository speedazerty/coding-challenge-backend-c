import express from 'express';

const app = express();
const port = 8080;

app.get('/suggestions', (req, res) => {
    res.json([]);
});

app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:%d/suggestions', port);
});
