from matterflow.node import ManipulationNode, NodeException
from matterflow.parameters import *

import pandas as pd
import json

class CombineNode(ManipulationNode):
    name = "Combiner"
    num_in = 2
    num_out = 1

    OPTIONS = {
    }

    def execute(self, predecessor_data, flow_vars):
        try:
            first_json = predecessor_data[0]
            second_json = predecessor_data[1]
            combined_json = [
                first_json, second_json
            ]

            return json.dumps(combined_json)
        
        except Exception as e:
            raise NodeException('combine', str(e))
