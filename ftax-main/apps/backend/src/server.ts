import express from 'express';

import authRoutes from './routes/authRoutes.js';
import taxRoutes from './routes/taxRoutes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/tax', taxRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`@ftax/backend Server started at port ${PORT}`);
});
