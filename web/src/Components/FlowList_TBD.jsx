import React, { useState, useEffect } from "react";
import { ListGroup, Button, InputGroup, FormControl } from "react-bootstrap";
import * as API from '../API';

import StatusLight from "./StatusLight";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic, if necessary
    };
  }, []);

  return { data, loading, error };
}

const FlowList = () => {

  const { data, loading, error } = useFetch();

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
          <div>There are no flow entries.</div>
      );
  }

//  return (
//    <p>{JSON.stringify(data)}</p>
//  )

/*
  // Sample list of flows with uniqueId
  const [flows, setFlows] = useState([
    { id: 1, uniqueId: "abc123", status: "complete", name: "flow1.json" },
    { id: 2, uniqueId: "def456", status: "complete", name: "flow2.json" },
    { id: 3, uniqueId: "ghi789", status: "complete", name: "flow3.json" },
    { id: 4, uniqueId: "jkl012", status: "complete", name: "flow4.json" },
    { id: 5, uniqueId: "mno345", status: "complete", name: "flow5.json" },
    { id: 6, uniqueId: "pqr678", status: "complete", name: "flow6.json" }
  ]);
*/
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [boldFlowId, setBoldFlowId] = useState(null);

  // Handler to alert the flow name and make the flow name bold
  const handleFlowClick = (flow) => {
    alert(`You clicked on: ${flow.name}`);
    setBoldFlowId(flow.id); // Set the clicked flow to bold
  };

  // Handler to delete a flow
  const handleDelete = (flowId) => {
    setFlows(flows.filter((flow) => flow.id !== flowId));
  };

  // Handler to start renaming a flow
  const handleRename = (flowId, currentName) => {
    setRenamingId(flowId);
    setRenameValue(currentName);
  };

  // Handler to confirm renaming
  const handleRenameConfirm = (flowId) => {
    setFlows(
      flows.map((flow) =>
        flow.id === flowId ? { ...flow, name: renameValue } : flow
      )
    );
    setRenamingId(null);
  };

  // Function to find the next unique flow ID
  const getNextFlowId = () => {
    if (flows.length === 0) {
        return 1; // Return 1 if the array is empty
    }      
    const flowIds = flows.map((flow) => flow.id);
    const maxId = Math.max(...flowIds); // Find the maximum existing ID
    return maxId + 1; // Return the next highest ID
  };

  // Handler to add a new flow and make it bold
  const handleAddFlow = () => {
    const newId = getNextFlowId(); // Get the next unique ID
    const newUniqueId = `unique${newId}`; // Simple unique ID
    const newFlow = { id: newId, uniqueId: newUniqueId, name: `newFlow${newId}.json` };

    // Add the new flow to the list and set it as the bold flow
    setFlows([...flows, newFlow]);
    setBoldFlowId(newId); // Highlight the newly added flow in bold
  };

  // Handler to confirm renaming
  const handleChangeState = (flowId) => {
    setFlows(
      flows.map((flow) =>
        flow.id === flowId ? { ...flow, status: flow.status === 'complete' ? 'configured' : 'complete' } : flow
      )
    );
  };

  return (
    <div>
      <div
        style={{
          maxHeight: "300px", // Maximum height of 5 items with a scroll bar
          overflowY: flows.length > 5 ? "scroll" : "auto",
        }}
      >
        <ListGroup>
          {data.map((flow) => (
            <ListGroup.Item
              key={flow.uniqueId} // Using uniqueId for key
              className="d-flex justify-content-between align-items-center"
            >
              {/* Flow name or Rename Input */}
              {renamingId === flow.id ? (
                <InputGroup size="sm" style={{ maxWidth: "200px" }}>
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
                    fontWeight: boldFlowId === flow.id ? "bold" : "normal", // Make flow name bold if clicked
                  }}
                >
                  {flow.name}
                </span>
              )}

              {/* Action buttons: Rename and Delete */}
              <div>
                <Button
                  variant="link"
                  size="sm"
                  className="me-2"
                  onClick={() => handleChangeState(flow.id)}
                >
                  <StatusLight status={flow.status}/>
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleRename(flow.id, flow.name)}
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
};

export default FlowList;
