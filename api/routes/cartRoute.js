// routes/cartRoute.js
import express from 'express';
import { getUserCart, addToCart, removeFromCart, updateUserCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getUserCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.put('/update/:userId', updateUserCart);

export default router;
