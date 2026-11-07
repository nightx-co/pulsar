import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { requestHandler } from "./setup";

export const handler = async (event : APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    
    console.log('request recived')
    
    const responsae = await requestHandler.handle(event as any);

    if(responsae) {
        return {
            statusCode: responsae.status,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: responsae.message }),
        }
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Not Found" }),
    }
}