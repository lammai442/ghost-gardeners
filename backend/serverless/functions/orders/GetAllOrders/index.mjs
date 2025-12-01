import { getAllOrders } from "../../../services/order.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = async () => {
  try {
    const items = await getAllOrders();

    return {
      statusCode: 200,
      body: JSON.stringify({ orders: items }),
    };
  } catch (err) {
    console.error("Error in GetAllOrders:", err);
    return errorHandler().onError({ response: null, error: err });
  }
};

/**
 * Author: ninerino
 * Lambda-handler to get all orders
 */