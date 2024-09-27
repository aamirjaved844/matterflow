import React, { useState, useEffect } from "react";
import * as API from '../API';
import { Dropdown, NavDropdown } from 'react-bootstrap';

const useFetch = () => {

    const [nodes, setNodes] = useState({
        "title": "GetNodeData",
        "items": []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        API.getFlows().then((value) => {
            var new_nodes = {
                "title": "GetNodeData",
                "items": []
            }
            for (let i = 0; i < value.data.length; i++) {
                var matterflow = JSON.parse(value.data[i]["json_data"])['matterflow'];
                
                var flow = {
                    "label": matterflow['name'],
                    "items": []
                }
    
                try {
                    var nodes = matterflow['graph']['nodes'];
                    for (let j = 0; j < nodes.length; j++) {
                        var node = nodes[j];
                        flow.items.push({
                            "label": node['name'],
                            "node_id": node['node_id']
                        })
                    }
                    new_nodes.items.push(flow)
                } catch (error) {
                    console.log(error)
                }

            }
            setNodes(new_nodes);            
        });
            
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return { nodes, loading, error};
}

const handleNodeSelect = (handleNodeData, nodeId) => {
    API.retrieveData(nodeId).then((value) => {
        handleNodeData(value);
    });
};

const NodeDataExplorer = ({ handleNodeData }) => {
    const { nodes, loading, error} = useFetch();


    const MultiLevelDropdown = ({ config }) => {
  
        // Recursive function to render the menu items from the JSON structure
        const renderMenuItems = (items) => {
          return items.map((item, index) => {
            if (item.items) {
              // Render a dropdown if there are nested items
              return (
                <NavDropdown
                  key={index}
                  title={item.label}
                  id={`dropdown-${item.label}`}
                >
                  {renderMenuItems(item.items)}
                </NavDropdown>
              );
            }
            return (
              <Dropdown.Item key={index} onClick={() => handleNodeSelect(handleNodeData, item.node_id)}>
                {item.label}
              </Dropdown.Item>
            );
          });
        };
      
        return (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {config.title}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              {renderMenuItems(config.items)}
            </Dropdown.Menu>
          </Dropdown>
        );
      };


    return (
        <MultiLevelDropdown config={nodes} />                
    )

};

export default NodeDataExplorer