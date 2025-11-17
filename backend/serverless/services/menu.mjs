import { client } from './client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

export const postMenuItem = async () => {
  const command = new PutItemCommand({
    TableName: 'mojjen-table',
    Item: {
      PK: { S: 'PRODUCT' },
      SK: { S: 'PRODUCT#meal124' },
      attribute: {
        M: {
          name: { S: 'Vålberg vego' },
          id: { S: 'meal124' },
          category: { S: 'meal' },
          price: { N: '45' },
          summary: { S: 'Falafelkôrv med harissa och koriander' },
          details: {
            S: 'Vår Vålberg Vego är en smakrik falafelkôrv, kryddad med het harissa och färsk koriander för en spännande twist på klassiska smaker. Den serveras med färska grönsaker och en lätt dressing som kompletterar kryddigheten i korven. Perfekt för dig som vill ha en matig, växtbaserad rätt full av smak och textur.',
          },
          img: { S: 'www.bild.se' },
          items: {
            L: [{ S: 'prod3454' }, { S: 'prod4513' }],
          },
          includeDrink: { S: 'drink1451' },
          createdAt: { S: new Date().toISOString() },
        },
      },
      category: {
        S: 'MENU',
      },
      id: {
        S: 'meal124',
      },
      statusCategory: {
        S: 'STATUS#PRODUCT',
      },
      status: { S: 'active' },
    },
  });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.log('Error in postMenuItem in client ', error.message);
  }
};

export const postProductItem = async () => {
  const command = new PutItemCommand({
    TableName: 'mojjen-table',
    Item: {
      PK: { S: 'PRODUCT' },
      SK: { S: 'PRODUCT#prod124' },
      attribute: {
        M: {
          name: { S: 'Korvbröd' },
          id: { S: 'prod124' },
          category: { S: 'products' },
          price: { N: '10' },
          summary: { S: 'Mjukt och saftigt korvbröd' },
          img: { S: 'www.korvbrod.se' },
          allergens: {
            L: [{ S: 'gluten' }, { S: 'ägg' }, { S: 'mjölk' }],
          },
          stock: { N: '100' },
          createdAt: { S: new Date().toISOString() },
        },
      },
    },
  });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.log('Error in postMenuItem in client ', error.message);
  }
};
