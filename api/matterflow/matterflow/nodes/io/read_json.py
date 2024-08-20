from matterflow.node import IONode, NodeException
from matterflow.parameters import *
import pandas as pd
import json

class ReadJsonNode(IONode):
    """ReadJsonNode

    Reads a Json file into a workflow.

    Raises:
         NodeException: any error reading json file, converting
            to workflow.
    """
    name = "Read Json"
    num_in = 0
    num_out = 1

    OPTIONS = {
        "file": FileParameter(
            "File",
            docstring="Json File"
        ),
    }

    def execute(self, predecessor_data, flow_vars):
        print("*"*80)
        print("file")
        print(flow_vars["file"].get_value())
        try:
            # Read from file and check json validity
            with open(flow_vars["file"].get_value(), 'r') as f:
                json_string = f.read()
                f.close()

            #check that its valid json by converting to a json object and then back again to string
            #this will throw an exception if invalid json
            json_string = json.dumps(json.loads(json_string))
            return json_string            
        
        except Exception as e:
            print("got error in read")
            raise NodeException('read json', str(e))



