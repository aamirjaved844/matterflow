import React, { useState, useEffect } from "react";
import { ListGroup, Button, InputGroup, FormControl, Tabs, Tab } from "react-bootstrap";
import ModelModal from "./ModelModal"; // Import the model modal component
import InstanceModal from "./InstanceModal"; // Import the instance modal component
import * as API from '../API';

const useFetch = () => {
  const [models, setModels] = useState(null);
  const [instances, setInstances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response1 = await API.getModels();
      console.log("response1")
      console.log(response1)
      setModels(response1.data);
      const response2 = await API.getInstances();
      console.log(response2.data)
      setInstances(response2.data);
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

  return { models, instances, loading, error, refetch };
}


const ModelAndInstanceList = () => {
  const { models, instances, loading, error, refetch } = useFetch();
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [boldItemId, setBoldItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("model"); // 'model' or 'instance'
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!models) {
    return <div>No data.</div>;
  }

  if (Object.keys(models).length === 0) {
      return (
        <div>You have no saved models.</div>
      );
  }

  // Handler to alert the item name and make the item name bold
  const handleItemClick = (item, type) => {
    //alert(`You clicked on: ${item.name}`);
    setBoldItemId(item.id); // Set the clicked item to bold
    setSelectedItem(item);
    setModalType(type);
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Handler to start renaming an item
  const handleRename = (id, currentName) => {
    setRenamingId(id);
    setRenameValue(currentName);
  };

  // Handler to confirm renaming
  const handleRenameConfirm = (id, type) => {
    if (type === "model") {
      const inputModelData = {
        id: id,
        description: renameValue,
      };
      API.updateModel(id, inputModelData)
          .then(() => {
              console.log("Model saved successfully");
              refetch();
          });
    } else {
      const inputInstanceData = {
        id: id,
        description: renameValue,
      };
      API.updateInstance(id, inputInstanceData)
          .then(() => {
              console.log("Instance saved successfully");
              refetch();
          });
    }
    setRenamingId(null);
  };

  // Function to find the next unique ID for models or instances
  const getNextItemId = (type) => {
    const items = type === "model" ? models : instances;
    if (items.length === 0) return 1; // Return 1 if the array is empty
    const itemIds = items.map((item) => item.id);
    const maxId = Math.max(...itemIds); // Find the maximum existing ID
    return maxId + 1; // Return the next highest ID
  };

  // Handler to add a new item (model or instance)
  const handleAddItem = (type) => {
    const newId = getNextItemId(type);
    const newUniqueId = `unique${newId}`; // Simple unique ID
    const newItem =
      type === "model"
        ? { id: newId, description: newUniqueId, name: `newModel${newId}.json`, json_data: {} }
        : { id: newId, description: newUniqueId, name: `newInstance${newId}`, json_data: {} };

    if (type === "model") {
        // Logic to send the form data to the server
        API.addModel(newItem).then(() => {
          console.log("Model added successfully");
          refetch();
        })
        .catch(err => console.log(err));
    } else {
        // Logic to send the form data to the server
        API.addInstance(newItem).then(() => {
          console.log("Instance added successfully");
          refetch();
        })
        .catch(err => console.log(err));
    }
    setBoldItemId(newId); // Highlight the newly added item in bold
  };

  // Handler to delete an item (model or instance)
  const handleDelete = (id, type) => {
    if (type === "model") {
      API.deleteModel(id).then(() => {
        console.log("Model deleted successfully");
        refetch();
      })
      .catch(err => console.log(err));
    } else {
      API.deleteInstance(id).then(() => {
        console.log("Instance deleted successfully");
        refetch();
      })
      .catch(err => console.log(err));
    }
  };

  // Rendering a list of items (models or instances)
  const renderList = (items, type) => (
    <div style={{ maxHeight: "300px", overflowY: items.length > 5 ? "scroll" : "auto" }}>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item
            key={item.id} // Using uniqueId for key
            className="d-flex justify-content-between align-items-center"
          >
            {/* Item name or Rename Input */}
            {renamingId === item.id ? (
              <InputGroup size="sm" style={{ maxWidth: "200px" }}>
                <FormControl
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  onClick={() => handleRenameConfirm(item.id, type)}
                >
                  Save
                </Button>
              </InputGroup>
            ) : (
              <span
                onClick={() => handleItemClick(item, type)}
                style={{
                  cursor: "pointer",
                  fontWeight: boldItemId === item.id ? "bold" : "normal", // Make item name bold if clicked
                }}
              >
                {item.description}
              </span>
            )}

            {/* Action buttons: Rename and Delete */}
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => handleRename(item.id, item.description)}
              >
                Rename
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDelete(item.id, type)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );

  return (
    <div>
      <Tabs defaultActiveKey="models" id="model-instance-tabs" className="mb-3">
        <Tab eventKey="models" title="Models">
          {renderList(models, "model")}

          {/* Button to add new model */}
          <div className="mt-3 text-center">
            <Button variant="primary" onClick={() => handleAddItem("model")}>
              Add New Model
            </Button>
          </div>
        </Tab>

        <Tab eventKey="instances" title="Instances">
          {renderList(instances, "instance")}

          {/* Button to add new instance */}
          <div className="mt-3 text-center">
            <Button variant="primary" onClick={() => handleAddItem("instance")}>
              Add New Instance
            </Button>
          </div>
        </Tab>
      </Tabs>
      {/* Full-screen modal for models and instances */}
      {selectedItem && modalType === "model" && (
        <>
        <ModelModal show={showModal} handleClose={handleCloseModal} modelName={selectedItem.name} modelId={selectedItem.id}/>
        </>
      )}
      {selectedItem && modalType === "instance" && (
        <InstanceModal show={showModal} handleClose={handleCloseModal} instanceName={selectedItem.name} instanceId={selectedItem.id}/>
      )}
    </div>
  );
};

export default ModelAndInstanceList;
