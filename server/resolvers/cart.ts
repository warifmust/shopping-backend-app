import Cart from "../models/cart";

const cartResolver = {
  getProductsInCart: async (args: any) => {
    try {
      const cart = await Cart.find({ belongsTo: args.belongsTo });
      return cart;
    } catch (e) {
      throw e;
    }
  },
  addToCart: async (args: any) => {
    try {
      const cart = await new Cart({
        name: args.cartInput.name,
        img: args.cartInput.img,
        price: args.cartInput.price,
        nutrient: args.cartInput.nutrient,
        belongsTo: args.cartInput.belongsTo,
        status: args.cartInput.status,
      });
      const saveCart = await cart.save();
      return {
        ...saveCart,
        _id: saveCart.id,
        name: saveCart.name,
        img: saveCart.img,
        price: saveCart.price,
        nutrient: saveCart.nutrient,
        belongsTo: saveCart.belongsTo,
        status: saveCart.status,
      };
    } catch (e) {
      throw e;
    }
  },
  removeProductInCart: async (args: any) => {
    try {
      await Cart.findOneAndDelete({ _id: args.id });
      return true;
    } catch (e) {
      throw e;
    }
  },
};

export default cartResolver;
