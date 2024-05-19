import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

exports.handler = async (event: any) => {
    const { body } = event;
    const data = JSON.parse(body);

    const params = {
        TableName: 'Items',
        Item: {
            id: uuidv4(),
            ...data
        }
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify(params.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create item' })
        };
    }
};
