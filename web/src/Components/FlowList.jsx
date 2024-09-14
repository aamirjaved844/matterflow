import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { timeTag, truncate } from '../lib/formatters'
import * as API from '../API';
import DialogConfirmation from './DialogConfirmation';
import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import StatusLight from "./StatusLight";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const PROCESS_POLL_TIME = 10000; // 10 seconds

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const response = await API.getFlows();
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    const refetch = async () => {
      setLoading(true);
      await fetchData();
    }

    useEffect(() => {
      fetchData();
    }, []);
  
    return { data, loading, error, refetch };
  }


const FlowList = (props) => {

  const { data, loading, error, refetch } = useFetch();
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const selected_flow_id = props?.flow_id;

  const [processes, setProcesses] = useState([]);
  const [isPolling, setIsPolling] = useState(true);
  const [pollInterval, setPollInterval] = useState(PROCESS_POLL_TIME); 
  
  useEffect(() => {
    const pollProcesses = async () => {
      try {
        const response = await API.getProcesses();
        setProcesses(JSON.parse(response.data));
      } catch (error) {
        console.error(error);
      }
    };
  
    pollProcesses();
  
    const intervalId = setInterval(pollProcesses, pollInterval);
  
    return () => {
      clearInterval(intervalId);
    };
  }, [pollInterval]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Save Flow First
    </Tooltip>
  );



  // Handler to alert the flow name and make the flow name bold
  const handleFlowClick = (flow) => {
    if (selected_flow_id == flow.id) {
      return;
    }
    if (props.isDirty) {
      if (window.confirm("Are you sure? You will lose unsaved work.")) {
        window.location.href = `/${flow.id}`
      }        
    }
    else {
      window.location.href = `/${flow.id}`
    }
  };

  const handleDelete = async (flow_id) => {
      API.deleteFlow(flow_id)
        .then(() => {
            console.log("Flow deleted successfully");
            refetch();
            if (selected_flow_id == flow_id) {
              window.location = `/`;
            }      
        });
  };

  // Handler to start renaming a flow
  const handleRename = (flowId, currentName) => {
    setRenamingId(flowId);
    setRenameValue(currentName);
  };

  // Handler to confirm renaming
  const handleRenameConfirm = (flowId) => {
    const inputData = {
      id: flowId,
      description: renameValue,
    };
    API.updateFlow(flowId, inputData)
        .then(() => {
            console.log("Flow saved successfully");
            refetch();
        });

    setRenamingId(null);

  };

  // Function to find the next unique flow ID
  const getNextFlowId = () => {
    if (data.length === 0) {
        return 1; // Return 1 if the array is empty
    }      
    const flowIds = data.map((flow) => flow.id);
    const maxId = Math.max(...flowIds); // Find the maximum existing ID
    return maxId + 1; // Return the next highest ID
  };

  // Handler to add a new flow and make it bold
  const handleAddFlow = () => {
    if (props.isDirty) {
      if (window.confirm("Are you sure? You will lose unsaved work.")) {
        props.onNewFlow();
      }        
    }
    else {
      props.onNewFlow();
    }
  };

  // Function to calculate flow process status
  const getFlowStatus = (flow) => {
  
    //returns option of "configured", "configured", "complete"

    //filter the processes to find the process matching this flow
    //const flowProcesses = processes.filter((process) => process.name == flow.name);
    const flowProcesses = processes.filter((process) => process.name == "foo");

    if (flowProcesses.length === 0) {
      return "";
    }
    else {
      if (flowProcesses[0]['statename'] == 'RUNNING') {
        return "complete"
      }
      else {
        return "configured"
      }
    }
  };

  // Handler to change state
  const handleChangeState = (flowName) => {
    //lets try to start the flow process
    flowName = 'foo'

    const flowProcesses = processes.filter((process) => process.name == flowName);

    if (flowProcesses.length === 0) {
      return; //do nothing
    }
    else {
      if (flowProcesses[0]['statename'] == 'RUNNING') {
        API.stopProcess(flowName)
        .then(() => {
          console.log("Stopped Process Successfully");
          setPollInterval(pollInterval+1); //lets change the polling interval to force a refetch
        })
        .catch(err => console.log(err));
      }
      else {
        API.startProcess(flowName)
        .then(() => {
          console.log("Started Process Successfully");
          setPollInterval(pollInterval-1); //lets change the polling interval to force a refetch
        })
        .catch(err => console.log(err));
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data.</div>;
  }

  if (Object.keys(data).length === 0) {
      return (
        <div>You have no saved flows.</div>
      );
  }

  // Handler to alert the flow name and make the flow name bold
    return (
      <div>
        <div
          style={{
            maxHeight: "300px", // Maximum height of 5 items with a scroll bar
            overflowY: data.length > 5 ? "scroll" : "auto",
          }}
        >
          <ListGroup>


            {selected_flow_id == 'new' && 
              <ListGroup.Item
              key={'new'} // Using uniqueId for key
              className="d-flex justify-content-between align-items-center"
            >
                  <span
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold", // Make flow name bold if clicked
                    }}
                  >
                    *unsaved_flow
                  </span>
                {/* Action buttons: Rename and Delete */}
                <div>
                  <Button
                    variant="link"
                    size="sm"
                    className="me-2"
                  >
                    <StatusLight />
                  </Button>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="me-2"
                  >
                    Rename
                  </Button>

                  </OverlayTrigger>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => window.location = `/`}
                  >
                    Delete
                  </Button>
                </div>

              </ListGroup.Item>
          }

            {[...data].reverse().map((flow) => (
              <ListGroup.Item
                key={flow.name} // Using uniqueId for key
                className="d-flex justify-content-between align-items-center"
              >
                {/* Flow name or Rename Input */}
                {renamingId === flow.id ? (
                  <InputGroup size="sm" style={{ maxWidth: "200px" }} >
                    <FormControl
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                    />
                    <Button
                      variant="outline-success"
                      onClick={() => handleRenameConfirm(flow.id)}
                    >
                      Save
                    </Button>
                  </InputGroup>
                ) : (
                  <span
                    onClick={() => handleFlowClick(flow)}
                    style={{
                      cursor: "pointer",
                      fontWeight: selected_flow_id == flow.id ? "bold" : "normal", // Make flow name bold if clicked
                    }}
                  >
                   {(selected_flow_id == flow.id && props.isDirty) ? "*" : ""}{flow.description}
                  </span>
                )}
  
                {/* Action buttons: Rename and Delete */}
                <div>
                  <Button
                    variant="link"
                    size="sm"
                    className="me-2"
                    onClick={() => handleChangeState(flow.name)}
                  >
                    <StatusLight status={getFlowStatus(flow)}/>
                  </Button>
  
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleRename(flow.id, flow.description)}
                  >
                    Rename
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(flow.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
  
        {/* Button to add new flow */}
        <div className="mt-3 text-center">
          <Button variant="primary" onClick={handleAddFlow}>
            Add New Flow
          </Button>
        </div>
      </div>
    );
}

export default FlowList