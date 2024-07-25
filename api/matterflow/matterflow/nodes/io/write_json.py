from matterflow.node import IONode, NodeException
from matterflow.parameters import *
import json

class WriteJsonNode(IONode):
    """WriteJsonNode

    Writes the current json to a Json file.

    Raises:
        NodeException: any error writing Json file, converting
            from json data.
    """
    name = "Write Json"
    num_in = 1
    num_out = 0
    download_result = True

    OPTIONS = {
        "file": StringParameter(
            "Filename",
            docstring="CSV file to write"
        ),
    }

    def execute(self, predecessor_data, flow_vars):
        try:

            # Convert JSON data to string

            json_string = json.dumps(predecessor_data[0])

            print("<**********************************************************************************************************************>")
            print(flow_vars['file'].get_value())
            print("</**********************************************************************************************************************>")

            # Write to CSV and save
            with open(flow_vars["file"].get_value(), "a") as f:
                f.write(json_string)
                f.write('\n')
    
            return json_string

        except Exception as e:
            raise NodeException('write json', str(e))
