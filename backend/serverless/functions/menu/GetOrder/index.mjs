import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponses } from "../../../responses/index.mjs";
import { getOrder } from "../../../services/order.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  if (!id) {
    return sendResponses(400, { success: false, message: "Order ID saknas." });
  }

  const order = await getOrder(id);

  return sendResponses(200, { success: true, order });
}).use(errorHandler());
