import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponses } from "../../../responses/index.mjs";
import { changeOrder } from "../../../services/order.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters || {};

  if (!id) {
    return sendResponses(400, {
      success: false,
      message: "Order ID saknas i URL.",
    });
  }

  if (!event.body) {
    return sendResponses(400, {
      success: false,
      message: "Request body saknas.",
    });
  }

  const { items, userComment, staffComment } = JSON.parse(event.body);

  const order = await changeOrder({
    orderId: id,
    items,
    userComment,
    staffComment,
  });

  return sendResponses(200, {
    success: true,
    order,
  });
}).use(errorHandler());
