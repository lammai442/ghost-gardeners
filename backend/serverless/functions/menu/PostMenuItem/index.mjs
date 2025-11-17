import middy from '@middy/core';
import { postMenuItem } from '../../../services/menu.mjs';
import { sendResponses } from '../../../responses/index.mjs';

export const handler = middy(async (event) => {
  const response = await postMenuItem();
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
});
