import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;
app.use(json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

