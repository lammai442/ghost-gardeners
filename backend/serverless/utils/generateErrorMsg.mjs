export const generateErrorMsg = (handler) => {
	if (handler.error.message === 'Unsupported Media Type')
		return 'Include body in request';
	if (handler.error.message === 'Invalid or malformed JSON was provided')
		return 'Missing body in request or malformed JSON was provided';
	else return handler.error.message;
};
