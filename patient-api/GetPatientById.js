import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    region: 'us-east-1'
});

export const handler = async (event) => {
    const { patientId } = event.queryStringParameters || {};
    const params = {
        TableName: 'Patients',
        Key: {
            'Id': { S: patientId }
        }
    };
 
    const getItemCommand = new GetItemCommand(params);

    try {
        const data = await client.send(getItemCommand);
        console.log("DynamoDB response data:", JSON.stringify(data, null, 2));

        if (!data.Item) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: "Item not found" })
            };
        }
        
        return {    
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        console.log("Error occurred:", error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
