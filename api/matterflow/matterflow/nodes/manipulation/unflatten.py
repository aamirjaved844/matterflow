from matterflow.node import ManipulationNode, NodeException
from matterflow.parameters import *

import pandas as pd
import json
import jmespath
from collections import defaultdict


#######################

def transform_json_data(input_json):
    
    def nested_dict():
        return defaultdict(nested_dict)

    # Convert the defaultdict back to a regular dictionary
    def convert_to_regular_dict(d):
        if isinstance(d, defaultdict):
            d = {k: convert_to_regular_dict(v) for k, v in d.items()}
        return d

    try:
        # Load the input JSON string into a Python object (list or dict)
        data = json.loads(input_json)


        # Check if the input is an attribute update
        if 'event' in data and data['event']=='attribute_updated':


            # Check if the key matches the pattern 'number/number/number'
            parts = data['data'][1].split('/')


            if len(parts) == 3 and all(part.isdigit() for part in parts):
                # Create a default dictionary for the transformed key
                transformed_attributes = nested_dict()
                # Assign the value at index 2 to the unflattened key structure
                transformed_attributes[parts[0]][parts[1]][parts[2]] = data['data'][2]
                # Convert the defaultdict to a regular dictionary
                transformed_attributes = convert_to_regular_dict(transformed_attributes)
                # Replace the original string key with the transformed dictionary
                data['data'][1] = transformed_attributes
                # Remove the value that was previously at index 2
                data['data'].pop(2)


        # Otherwise, handle the original structure of the input JSON
        else:
            # Assuming the input is a dictionary
            if 'result' in data:
                for i in range(len(data['result'])):
                    # Create a default dictionary that allows for dynamic creation of nested dictionaries
                    transformed_attributes = nested_dict()

                    # Iterate over the attributes in the input data
                    for key, value in data['result'][i]['attributes'].items():
                        # Check if the key matches the pattern 'number/number/number'
                        parts = key.split('/')
                        if len(parts) == 3 and all(part.isdigit() for part in parts):
                            # Decompose the key into three parts and insert the value accordingly
                            transformed_attributes[parts[0]][parts[1]][parts[2]] = value
                        else:
                            # Handle other attributes if necessary
                            transformed_attributes[key] = value

                    transformed_attributes = convert_to_regular_dict(transformed_attributes)

                    # Update the original data with the transformed attributes
                    data['result'][i]['attributes'] = transformed_attributes

        # Convert the Python dictionary back to a JSON string
        return json.dumps(data)

    except Exception as e:
        # Return the original JSON string in case of an exception
        return input_json



#######################


class UnflattenNode(ManipulationNode):
    name = "Unflatten"
    num_in = 1
    num_out = 1

    OPTIONS = {
    }

    def execute(self, predecessor_data, flow_vars):
            # Convert JSON data to string
        try:
            json_string = json.dumps(predecessor_data[0])

            json_string = transform_json_data(json_string)

            return json_string

        except Exception as e:
            raise NodeException('unflatten', str(e))
