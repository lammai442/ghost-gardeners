import { sendResponses } from '../responses/index.mjs';
import { generateErrorMsg } from '../utils/generateErrorMsg.mjs';

export const errorHandler = () => ({
	onError: (handler) => {
		handler.response = sendResponses(400, {
			message: generateErrorMsg(handler),
		});
	},
});
