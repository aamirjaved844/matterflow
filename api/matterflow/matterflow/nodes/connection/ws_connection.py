from matterflow.node import ConnectionNode, NodeException
from matterflow.parameters import *
import json
import pandas as pd
from matterflow.connection import *
import click
import os 
import socket

def isWebsocketOpen(ip,port):
   s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
   try:
      s.connect((ip, int(port)))
      s.shutdown(2)
      return True
   except:
      return False

class WsConnectionNode(ConnectionNode):
    """WsConnectionNode

    Reads a Websocket into a workflow.

    Raises:
         NodeException: any error reading web socket, converting
            to workflow.
    """
    name = "WS Connection"
    num_in = 0
    num_out = 1

    #test_file_path = os.path.dirname(os.path.realpath(__file__)) + "/../../tests/sample_matter.json"
    test_file_path = ""

    OPTIONS = {
        "file": FileParameter(
            "Test Json",
            default=test_file_path,
            docstring="Json File"
        ),
        "input": TextParameter(
            "Connection Settings",
            default='{"Client ID": "client123", "Connection Timeout": 60, "Keep Alive": 120, "host": "127.0.0.1", "port": 5580 }',
            docstring="Connection Settings Input"
        ),        
    }

    def execute(self, predecessor_data, flow_vars):

        '''
        #executingInBrowser will be true if running in the visual editor and false if running on command line
        executingInBrowser = click.get_text_stream('stdin').isatty() 

        if executingInBrowser:
            return '{"message":"executing in browser"}'        
        else:
            return '{"message":"executing in cli"}'
        '''

        try:
            if flow_vars["file"].get_value() == "/tmp/":
                return '{"message":"try uploading a test json file"}'
            else:    
                df = pd.read_json(
                    flow_vars["file"].get_value()
                    , typ='series'
                )
                return df.to_json()

        except Exception as e:
            print("got error in ws connection")
            print(str(e))
            raise NodeException('WS Connection', str(e))
        
    def validate(self):
        """Validate Node configuration

        Checks all Node options and validates all Parameter classes using
        their validation method.

        Raises:
            ValidationError: invalid Parameter value
        """
        super().validate()

        value = self.options["input"].get_value()
        if not isinstance(value, str):
            raise Exception("Sorry, input must be a string") 
        
        try:
            json_settings = json.loads(value)
        except Exception as e:
            raise Exception("input must be a valid json object")

        if not isWebsocketOpen(json_settings['host'],json_settings['port']):
            raise Exception(f"Websocket must be available on {json_settings['host']} and port {json_settings['port']}")

