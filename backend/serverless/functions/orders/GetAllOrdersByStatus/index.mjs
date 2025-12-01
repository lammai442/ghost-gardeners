import { getAllOrdersByStatus } from "../../../services/order.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = async (event) => {
  try {
    const status = event?.pathParameters?.status;

    if (!status) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing status parameter" }),
      };
    }

    const items = await getAllOrdersByStatus(status);

    return {
      statusCode: 200,
      body: JSON.stringify({ orders: items }),
    };
  } catch (err) {
    console.error("Error in GetOrdersByStatus:", err);
    return errorHandler().onError({ response: null, error: err });
  }
};

/**
 * Author: ninerino
 * Lambda-handler to get all orders by status
 */