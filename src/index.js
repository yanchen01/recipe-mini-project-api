const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.post('/api/search', async (req, res) => {
	const { query } = req.body;

	const API_URL = 'https://api.nal.usda.gov/fdc/v1/foods';

	try {
		const response = await axios.get(`${API_URL}/search?api_key=DEMO_KEY&query=${JSON.stringify(query)}`);
		res.send(response.data);
	} catch (e) {
		console.log(e);
		res.status(400);
	}
});

app.get('/helloworld', (req, res) => {
	res.send('Hello World!');
});

app.get('*', (req, res) => {
	res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`API Server listening on port: ${PORT}`);
});
