/* global process */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Mongo Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cbc';
mongoose.connect(MONGO_URI).then(() => {
	console.log('Mongo connected');
}).catch(e => {
	console.error('Mongo connection error', e);
	process.exit(1);
});

// Schemas
const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	role: { type: String, default: 'admin' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.comparePassword = function(pw) {
	return bcrypt.compare(pw, this.password);
};

const productSchema = new mongoose.Schema({
	productID: { type: String, unique: true },
	name: String,
	altNames: [String],
	category: String,
	brand: String,
	price: Number,
	labeledPrice: Number,
	quantity: Number,
	stock: Number,
	isAvailable: Boolean,
	rating: Number,
	description: String,
	imageUrl: [String]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Auth middleware
function auth(req, res, next) {
	const header = req.headers.authorization;
	if (!header) return res.status(401).json({ message: 'No token provided' });
	const token = header.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
		req.user = decoded;
		next();
		} catch (e) { // eslint-disable-line no-unused-vars
			return res.status(401).json({ message: 'Invalid token' });
		}
}

// Routes
app.post('/api/users/register', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
		const exists = await User.findOne({ email });
		if (exists) return res.status(400).json({ message: 'User exists' });
		const user = await User.create({ name, email, password });
		res.json({ message: 'Registered', id: user._id });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

app.post('/api/users/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: 'Invalid credentials' });
	const ok = await user.comparePassword(password);
	if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
	const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
	res.json({ token });
});

// Products
app.post('/api/products', auth, async (req, res) => {
	try {
		const p = await Product.create(req.body);
		res.json(p);
	} catch (e) { res.status(400).json({ message: e.message }); }
});

app.get('/api/products', async (req, res) => {
	const list = await Product.find().sort('-createdAt').limit(500);
	res.json(list);
});

app.get('/api/products/:id', async (req, res) => {
	const p = await Product.findById(req.params.id);
	if (!p) return res.status(404).json({ message: 'Not found' });
	res.json(p);
});

app.delete('/api/products/:id', auth, async (req, res) => {
	await Product.findByIdAndDelete(req.params.id);
	res.json({ message: 'Deleted' });
});

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server listening on', PORT));
