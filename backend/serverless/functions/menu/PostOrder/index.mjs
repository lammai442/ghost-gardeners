import middy from "@middy/core";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { sendResponses } from "../../../responses/index.mjs";
import { createOrder } from "../../../services/order.mjs";

export const handler = middy(async (event) => {
  const body = JSON.parse(event.body);

  const order = await createOrder(body);

  return sendResponses(201, {
    success: true,
    order,
  });
}).use(errorHandler());
