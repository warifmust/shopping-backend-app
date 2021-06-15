import Product from "../models/product";

const productResolver = {
  getProducts: async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw err;
    }
  },
  createProduct: async (args: any) => {
    try {
      const product = new Product({
        name: args.productInput.name,
        img: args.productInput.img,
        price: args.productInput.price,
        nutrient: args.productInput.nutrient,
      });
      const saveProduct = await product.save();
      return {
        ...saveProduct,
        _id: saveProduct.id,
        name: saveProduct.name,
        img: saveProduct.img,
        price: saveProduct.price,
        nutrient: saveProduct.nutrient,
      };
    } catch (err) {
      throw err;
    }
  },
};

export default productResolver;
