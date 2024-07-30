import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    region: 'us-east-1'
});

export const handler = async (event) => {
    const { patientId } = event.queryStringParameters || {};

    try {
        const command = new DeleteItemCommand({
            TableName: 'Patients',
            Key: {
                'Id': { S: patientId }
            }
        });

        await client.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `User with ID ${patientId} deleted successfully`
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        console.error('Error deleting user:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error deleting user',
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
