export const sendResponses = (statusCode, data) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      ...data,
    }),
  };
};
