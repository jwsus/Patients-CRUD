import { DynamoDBClient, ScanCommand  } from '@aws-sdk/client-dynamodb';


const client = new DynamoDBClient({
    region: 'us-east-1' 
});

export const handler = async (event) => {
    const tableName = 'Patients';
    const exclusiveStartKey = null;

    const { limit = 10, filterText = '' } = event.queryStringParameters || {};
    
    console.log("filter aqui", filterText)
    
    const expressionAttributeNames= {
            '#Id' : 'Id',
            '#Name': 'Name',
            '#Email': 'Email',
            '#DateOfBirth': 'DateOfBirth'
        };
    
    const filterExpression = 'contains(#Name, :filterText)  OR contains(#Email, :filterText)';
    
     const expressionAttributeValues = {
        ':filterText': { S: filterText },
    };

    const countCommand = new ScanCommand ({
        TableName: tableName,
        Select: 'COUNT',
        ReturnConsumedCapacity: 'INDEXES'
    });
    
    const command = new ScanCommand ({
        TableName: tableName,
        Limit: limit,
        ExclusiveStartKey: exclusiveStartKey,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ProjectionExpression: '#Id, #Name, #Email, #DateOfBirth'
        
    });

    try {
        const data = await client.send(command);
        const countData = await client.send(countCommand);
        
        console.log("Data", data)

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: data.Items,
                lastEvaluatedKey: data.LastEvaluatedKey,
                pageCount: data.LastEvaluatedKey ? Math.ceil(data.ScannedCount / limit) : 1,
                totalItems: countData.ScannedCount,
                pageSize: limit,
            })
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: error  })
        };
    }
};