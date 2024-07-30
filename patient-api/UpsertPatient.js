import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({
    region: 'us-east-1' 
});

export const handler = async (event, context) => {
    let patient;
    
    const uniqueId = context.awsRequestId;
    
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'No body in request'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        patient = JSON.parse(event.body);

        if (!patient) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Invalid input. Expected a patient object in the body.'
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Error parsing body',
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    try {
        const command = new PutItemCommand({
            TableName: 'Patients',
            Item: {
                'Id': { S: patient.id || uniqueId },
                'Name': { S: patient.name },
                'Email': { S: patient.email },
                'DateOfBirth': { S: patient.dateOfBirth },
                'CPF': { S: patient.cpf },
                'Address': {
                    M: {
                        'CEP': { S: patient.address.cep },
                        'Street': { S: patient.address.street },
                        'Number': { S: patient.address.number },
                        'Complement': { S: patient.address.complement || '' },
                        'Neighborhood': { S: patient.address.neighborhood },
                        'City': { S: patient.address.city },
                        'State': { S: patient.address.state },
                        'Country': { S: patient.address.country }
                    }
                }
            }
        });

        await client.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Patient created successfully.'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error creating patient',
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
