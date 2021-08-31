require('dotenv').config();

import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { BATTUTA_API_KEY } = process.env;
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => ({
				user: false,
				userData: false,
				BATTUTA_API_KEY,
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
