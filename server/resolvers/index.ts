import authResolver from "./auth";
import userResolver from "./user";
import productResolver from "./product";
import cartResolver from "./cart";
import orderResolver from "./order";

export const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...productResolver,
  ...cartResolver,
  ...orderResolver,
};
