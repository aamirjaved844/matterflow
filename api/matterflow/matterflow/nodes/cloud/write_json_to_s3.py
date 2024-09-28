from matterflow.node import IONode, NodeException
from matterflow.parameters import *
import json
import jmespath
from io import StringIO  # for handling in-memory text streams
import boto3
import pandas as pd

class WriteJsonToS3Node(IONode):
    """WriteJsonS3Node

    Writes the current json to an S3 bucket.

    Raises:
        NodeException: any error writing Json file, converting
            from json data.
    """
    name = "Write Json To S3"
    num_in = 1
    num_out = 0
    download_result = False

    OPTIONS = {
        "aws_access_key_id": StringParameter(
            "AWS_SERVER_PUBLIC_KEY",
            docstring="AWS_SERVER_PUBLIC_KEY for s3"
        ),
        "aws_secret_access_key": StringParameter(
            "AWS_SERVER_SECRET_KEY",
            docstring="AWS_SERVER_SECRET_KEY for s3"
        ),
        "bucket": StringParameter(
            "Bucketname",
            docstring="Bucketname for s3"
        ),
        "filename": StringParameter(
            "Filename",
            docstring="Filename for s3 bucket"
        ),
        "write_mode": SelectParameter(
            "Write Mode",
            options=["overwrite", "append"],
            default="overwrite",
            docstring="Overwrite or append to S3 file"
        ),
        "exclude": StringParameter(
            "Exclude",
            default="",
            docstring="Exclude json matching this jmespath query"
        ),
    }

    def execute(self, predecessor_data, flow_vars):

        try:

            if flow_vars["exclude"].get_value() != '':
                print("trying to exclude now...................")
                filter_search_string = flow_vars["exclude"].get_value()

                search_results = jmespath.search(filter_search_string, predecessor_data[0])
                if search_results is not None: #if we found what we are looking for then exclude and dont write to disk
                    return '{"excluded":"true"}'

            # Convert JSON data to string
            json_string = json.dumps(predecessor_data[0])

            # Example DataFrame
            data = predecessor_data[0]
            df = pd.DataFrame(data)

            # Create a buffer to hold JSON data in memory
            json_buffer = StringIO()

            # Write the DataFrame to the buffer in JSON format
            df.to_json(json_buffer, orient='records')

            # Set up S3 resource and specify the bucket and object name
            session = boto3.Session(
                aws_access_key_id = flow_vars["aws_access_key_id"].get_value(),
                aws_secret_access_key = flow_vars["aws_secret_access_key"].get_value(),
            )

            s3_resource = session.resource('s3')
            bucket = flow_vars["bucket"].get_value()  # replaces with your bucket name

            # Upload the JSON from the buffer to S3
            file_name = flow_vars["filename"].get_value()

            if flow_vars["write_mode"].get_value() == 'overwrite':
                s3_resource.Object(bucket, file_name).put(Body=json_buffer.getvalue())
            else:
                try:
                    # Try to read the existing file from S3
                    obj = s3_resource.meta.client.get_object(Bucket=bucket, Key=file_name)
                    existing_data = obj['Body'].read().decode('utf-8')
                    # Append the new data to the existing data
                    updated_data = existing_data + '\n' + json_buffer.getvalue()
                except Exception as e:
                    print(e)
                    # If the file doesn't exist, create a new one with the current data
                    updated_data = json_buffer.getvalue()
                
                # Put the updated data back into S3
                s3_resource.Object(bucket, file_name).put(Body=updated_data)

            return json_string

        except Exception as e:
            raise NodeException('write json to s3', str(e))
