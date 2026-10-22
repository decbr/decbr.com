import json
import os

import boto3

table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])


def handler(event, context):
    if event["requestContext"]["http"]["method"] == "GET":
        count = table.get_item(Key={"id": "visits"}).get("Item", {}).get("count", 0)
    else:
        result = table.update_item(
            Key={"id": "visits"},
            UpdateExpression="ADD #c :one",
            ExpressionAttributeNames={"#c": "count"},
            ExpressionAttributeValues={":one": 1},
            ReturnValues="UPDATED_NEW",
        )
        count = result["Attributes"]["count"]
    return {
        "statusCode": 200,
        "headers": {"content-type": "application/json"},
        "body": json.dumps({"count": int(count)}),
    }
