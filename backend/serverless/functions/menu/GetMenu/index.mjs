/**
 * Author: ninerino
 * Function to fetch menu items from the API, as well as map the product IDs to their correct name
 */

import { client } from "../../../services/client.mjs";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = async () => {
	// Fetch database items where category is MENU
	try {
    	const menuResponse = await client.send(
    	new QueryCommand({
			TableName: "mojjen-table",
			IndexName: "GSI1",
			KeyConditionExpression: "category = :category",
			ExpressionAttributeValues: {
			":category": { S: "MENU" }
        }
      })
    );

    // Map through all the attributes in an item
    const menuItems = (menuResponse.Items || []).map(item => {
    const a = item.attribute?.M || {};

    return {
		id: a.id?.S || "",
		name: a.name?.S || "",
		category: a.category?.S || "",
		price: a.price?.N ? Number(a.price.N) : null,
		summary: a.summary?.S || "",
		details: a.details?.S || "",
		img: a.img?.S || "",
		includeDrink: a.includeDrink?.S || null,
		createdAt: a.createdAt?.S || "",
		items: a.items?.L?.map(i => i.S) || []
    };
    });

	// Return the menu items as JSON
    return {
    	statusCode: 200,
    	body: JSON.stringify(menuItems)
    };

	} catch (error) {
    	console.error("Error in Menu Handler:", error);
    	return errorHandler().onError({ response: null, error });
	}
};
