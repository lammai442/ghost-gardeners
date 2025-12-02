/* Just to clarify what's actually sent back to all connections. From what I see, an object called "message" is sent back with type, eventName, order (either old or new one), and timestamp. My intention is to basically make it so whatever orders either the client or business currently sees gets updated with the new one. Will the code as it is now automatically do that for them?
 */
/* No, the current code won't automatically update what they see. The StreamProcessor only sends the data - the client-side code needs to handle updating the display.
 */
// Here's what happens:

// What StreamProcessor sends:

{
  type: 'orderUpdate',
  eventName: 'INSERT',     // or 'MODIFY', 'REMOVE'
  order: { /* DynamoDB item */ },
  timestamp: 1234567890
}

// What clients need to do:

// Client-side JavaScript
websocket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  if (data.type === 'orderUpdate') {
    const { eventName, order } = data;
    
    if (eventName === 'INSERT') {
      // Add new order to the display
      addOrderToList(order);
    } 
    else if (eventName === 'MODIFY') {
      // Update existing order in the display
      updateOrderInList(order);
    }
    else if (eventName === 'REMOVE') {
      // Remove order from the display
      removeOrderFromList(order);
    }
  }
};

function updateOrderInList(updatedOrder) {
  // Find the order in your current display and update it
  const orderElement = document.getElementById(`order-${updatedOrder.orderId}`);
  if (orderElement) {
    // Update the DOM with new order data
    orderElement.innerHTML = renderOrder(updatedOrder);
  }
}

/* The StreamProcessor provides the data, but each client must implement the display logic.

For business side: Show all orders For customer side: Only update if order.userId === currentUserId

Does this clarify what you need to build on the client side? */