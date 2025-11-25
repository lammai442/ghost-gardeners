/**
 * Author: ninerino
 * LAMBDA handler for delete order
 */

import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponses } from "../../../responses/index.mjs";
import { cancelOrder } from "../../../services/order.mjs";

// DELETE /order/:id, ändra status till cancelled
export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  if (!id) {
    return sendResponses(400, {
      success: false,
      message: "Order ID saknas.",
    });
  }

  const updatedOrder = await cancelOrder(id);

  return sendResponses(200, {
    success: true,
    order: updatedOrder,
  });
}).use(errorHandler());

