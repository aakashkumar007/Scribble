// controllers/cart.controller.js
import Cart from "../model/cartModel.js";

export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (cart) {
      res.json(cart);
    } else {
      res.json({ items: [] });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);

      if (itemIndex > -1) {
        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= 1;
        } else {
          cart.items.splice(itemIndex, 1);
        }
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: req.body.items },
      { new: true, upsert: true }
    ).populate('items.productId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
