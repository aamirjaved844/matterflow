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
        try:
            df = pd.read_json(
                flow_vars["file"].get_value()
                , typ='series'
            )
            return df.to_json()

        except Exception as e:
            print("got error in read")
            raise NodeException('read json', str(e))



