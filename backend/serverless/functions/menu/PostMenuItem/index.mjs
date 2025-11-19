import middy from '@middy/core';
import { postMenuItem, postProductItem } from '../../../services/menu.mjs';
import { sendResponses } from '../../../responses/index.mjs';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { validateProduct } from '../../../middlewares/validateProduct.mjs';

/**
 * Author: KlaraSk
 * bodyParser, validator and errorHandler added
 */

export const handler = middy(async (event) => {
	const response = await postProductItem(event.body);
	if (response) {
		return sendResponses(201, {
			success: true,
			messages: 'Successfully added menuitem',
		});
	} else {
		return sendResponses(400, {
			success: false,
			message: 'Failed to add menuitem',
		});
	}
})
	.use(httpJsonBodyParser())
	.use(validateProduct())
	.use(errorHandler());
