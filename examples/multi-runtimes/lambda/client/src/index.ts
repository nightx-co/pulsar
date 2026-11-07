import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { worker } from "./setup";

export const handler = async (event : APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const path = event.path;

    // console.log({
    //     path : path,
    //     isBase64Encoded: event.isBase64Encoded,
    //     bodyType: typeof event.body,
    //     bodyPreview:
    //     typeof event.body === "string"
    //         ? event.body.slice(0, 80)
    //         : event.body,
    // });

    const response = await worker.handle(
        event as any,
        async (job) => {
            console.log(`ack job : ${job.id}`)
            await job.ack(true);
        }
    )

    if(response) {
        return {
            statusCode : response.status,
            headers : { "Content-Type": "application/json" },
            body: JSON.stringify({ message: response.message }),
        }
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Not Found" }),
    }
}