import Order from "../models/order";
import Cart from "../models/cart";

const orderResolver = {
  getOrder: async (args: any) => {
    try {
      const products = await Order.find({ belongsTo: args.belongsTo });
      return products;
    } catch (err) {
      throw err;
    }
  },
  createOrder: async (args: any) => {
    const listCartId = args.orderInput.orders.map((cart: any) => cart._id);
    try {
      await Cart.deleteMany({ _id: { $in: listCartId } });
      const order = new Order({
        belongsTo: args.orderInput.belongsTo,
        totalPrice: args.orderInput.totalPrice,
        status: "paid",
        orders: args.orderInput.orders,
      });
      const saveOrder = await order.save();
      return {
        ...saveOrder,
        _id: saveOrder.id,
        belongsTo: saveOrder.belongsTo,
        totalPrice: saveOrder.totalPrice,
        status: saveOrder.status,
        orders: saveOrder.orders.map((order: any) => {
          return {
            ...order,
            _id: order.id,
            name: order.name,
            img: order.img,
            price: order.price,
            nutrient: order.nutrient,
          };
        }),
      };
    } catch (err) {
      throw err;
    }
  },
  cancelOrder: async (args: any) => {
    try {
      const currentOrder = await Order.findOne({ _id: args.id });
      await Order.findOneAndUpdate(
        { _id: args.id },
        {
          _id: currentOrder.id,
          belongsTo: currentOrder.belongsTo,
          totalPrice: currentOrder.totalPrice,
          status: "canceled",
          orders: currentOrder.orders.map((order: any) => {
            return {
              ...order,
              _id: order.id,
              name: order.name,
              img: order.img,
              price: order.price,
              nutrient: order.nutrient,
            };
          }),
        },
        { upsert: true },
        () => {}
      );
      return true;
    } catch (e) {
      throw e;
    }
  },
};

export default orderResolver;
