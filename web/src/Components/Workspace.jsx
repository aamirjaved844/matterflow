import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import MFLinkFactory from './MFLink/MFLinkFactory';
import CustomNodeModel from './CustomNode/CustomNodeModel';
import CustomNodeFactory from './CustomNode/CustomNodeFactory';
import MFPortFactory from './MFPort/MFPortFactory';
import * as API from '../API';
import NodeMenu from './NodeMenu';
import '../styles/Workspace.css';
import GlobalFlowMenu from "./GlobalFlowMenu";
import DialogConfirmation from './DialogConfirmation';
import { useNavigate } from "react-router-dom";

/**
 * Workspace Component: Manages the diagram workspace and handles node operations.
 */
const Workspace = (props) => {
    const [nodes, setNodes] = useState([]);
    const [globals, setGlobals] = useState([]);
    const engine = useRef(createEngine()).current;
    const model = useRef(new DiagramModel()).current;
    const flow_id = props.params?.flow_id;
    const diagramData = useRef(null);
    const navigate = useNavigate();

    engine.getNodeFactories().registerFactory(new CustomNodeFactory());
    engine.getLinkFactories().registerFactory(new MFLinkFactory());
    engine.getPortFactories().registerFactory(new MFPortFactory());
    engine.setModel(model);
    engine.setMaxNumberPointsPerLink(0);

    useEffect(() => {
        if (flow_id) {
            API.getFlow(flow_id).then((value) => {
                try {
                    diagramData.current = JSON.parse(value.data.json_data);
                } catch {
                    console.log("Invalid or missing json data");
                    diagramData.current = {};
                }

                if (Object.keys(diagramData.current).length === 0) {
                    API.initWorkflow(model)
                        .then(() => {
                            getAvailableNodes();
                            getGlobalVars();
                        })
                        .catch(err => console.log(err));
                } else {
                    model.deserializeModel(diagramData.current, engine);
                    setTimeout(() => engine.repaintCanvas(), 100);
                    getGlobalVars();
                    getAvailableNodes();
                }
            });
        } else {
            API.initWorkflow(model)
                .then(() => {
                    getAvailableNodes();
                    getGlobalVars();
                })
                .catch(err => console.log(err));
        }
    }, [flow_id]);

    /**
     * Retrieve available nodes from server to display in the menu
     */
    const getAvailableNodes = () => {
        API.getNodes()
            .then(nodes => setNodes(nodes))
            .catch(err => console.log(err));
    };

    /**
     * Retrieve global variables from server
     */
    const getGlobalVars = () => {
        API.getGlobalVars()
            .then(vars => setGlobals(vars))
            .catch(err => console.log(err));
    };

    /**
     * Load diagram JSON and render
     * @param {Object} diagramData - Serialized diagram JSON
     */
    const load = (diagramData) => {
        model.deserializeModel(diagramData, engine);
        setTimeout(() => engine.repaintCanvas(), 100);
        getGlobalVars();
    };

    /**
     * Remove all nodes from diagram and initialize a new workflow on the server
     */
    const clear = () => {
        if (window.confirm("Clear diagram? You will lose all work.")) {
            model.getNodes().forEach(n => n.remove());
            API.initWorkflow(model)
                .then(() => getGlobalVars())
                .catch(err => console.log(err));
            engine.repaintCanvas();
        }
    };

    /**
     * Handle node creation from the drag-and-drop event
     * @param {Object} event - The drag-and-drop event
     */
    const handleNodeCreation = (event) => {
        const evtData = event.dataTransfer.getData("storm-diagram-node");
        if (!evtData) return;
        const data = JSON.parse(evtData);
        const node = new CustomNodeModel(data.nodeInfo, data.config);
        const point = engine.getRelativeMousePoint(event);
        node.setPosition(point);
        API.addNode(node)
            .then(() => {
                model.addNode(node);
                engine.repaintCanvas();
            })
            .catch(err => console.log(err));
    };

    /**
     * Handle saving the diagram data
     * @param {string} flow_id - The flow ID
     */
    const handleSave = (flow_id) => {
        const json_data = JSON.stringify(model.serialize());

        if (flow_id){
            const inputData = {
                id: flow_id,
                name: JSON.parse(json_data)['id'],
                description: "Matter Flow",
                json_data
            };
            API.updateFlow(flow_id, inputData)
                .then(() => {
                    console.log("Flow saved successfully");
                    navigate("/flows");
                });
        }
        else {
            const inputData = {
                name: JSON.parse(json_data)['id'],
                description: "Brett",
                json_data
            };
            // Logic to send the form data to the server
            API.addFlow(inputData)
                .then(() => {
                    console.log("Flow created successfully");
                    navigate("/flows");
                });
        }
        //save the flow file to server so we can start the supervisor process
        API.saveToServer(model.serialize());

    };

    /**
     * Execute the workflow nodes in order
     */
    const execute = async () => {
        const order = await API.executionOrder();
        for (let i = 0; i < order.length; i++) {
            let node = model.getNode(order[i]);
            try {
                await API.execute(node);
                node.setStatus("complete");
                node.setSelected(true);
                node.setSelected(false);
                if (node.options.download_result) {
                    await API.downloadDataFile(node);
                }
            } catch {
                console.log("Stopping execution because of failure");
                break;
            }
        }
    };

    /**
     * Manually create a node in the workspace
     */
    const manuallyCreateNodeWorkspace = async () => {
        console.log("In manuallyCreateNodeWorkspace");
        const data = {
            nodeInfo: {
                name: "WS Connection",
                node_key: "WsConnectionNode",
                node_type: "connection",
                num_in: 0,
                num_out: 1,
                color: "blue",
                filename: "ws_connection",
                doc: "WsConnectionNode\n\n    Reads a Websocket into a workflow.\n\n    Raises:\n         NodeException: any error reading web socket, converting\n            to workflow.\n    ",
                option_types: {
                    file: {
                        type: "file",
                        label: "Test Json",
                        value: "",
                        docstring: "Json File"
                    },
                    input: {
                        type: "text",
                        label: "Connection Settings",
                        value: "{\"Client ID\": \"client123\", \"Connection Timeout\": 60, \"Keep Alive\": 120, \"host\": \"127.0.0.1\", \"port\": 5580 }",
                        docstring: "Connection Settings Input"
                    }
                },
                download_result: false
            },
            config: {
                file: "",
                input: "{\"Client ID\": \"client123\", \"Connection Timeout\": 60, \"Keep Alive\": 120, \"host\": \"127.0.0.1\", \"port\": 5580 }"
            }
        };

        const node = new CustomNodeModel(data.nodeInfo, data.config);
        API.addNode(node)
            .then(() => {
                model.addNode(node);
                API.save(model.serialize());
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Row className="mb-3">
                <Col md={12}>
                    <DialogConfirmation id={flow_id} mainMessage="Save and Exit?" subMessage="Your changes will be saved!" confirmationHandler={() => handleSave(flow_id)} />

                    <Button size="sm" onClick={() => { alert(JSON.stringify(model.serialize())); }}>
                        ShowData
                    </Button>{' '}
                    <Button size="sm" onClick={() => { API.save(model.serialize()); }}>
                        Save
                    </Button>{' '}
                    <FileUpload handleData={load} />{' '}
                    <Button size="sm" onClick={clear}>Clear</Button>{' '}
                    <Button size="sm" onClick={execute}>Execute</Button>{' '}
                    <Button size="sm" onClick={manuallyCreateNodeWorkspace}>ManuallyCreateNodeWorkspace</Button>
                </Col>
            </Row>
            <Row className="Workspace">
                <Col xs={3}>
                    <GlobalFlowMenu
                        menuItems={nodes["Flow Control"] || []}
                        nodes={globals}
                        onUpdate={getGlobalVars}
                        diagramModel={model}
                    />
                    <NodeMenu nodes={nodes} onUpload={getAvailableNodes} />
                </Col>
                <Col xs={9} style={{ paddingLeft: 0 }}>
                    <div
                        style={{ position: 'relative', flexGrow: 1 }}
                        onDrop={handleNodeCreation}
                        onDragOver={(event) => event.preventDefault()}
                    >
                        <CanvasWidget className="diagram-canvas" engine={engine} />
                    </div>
                </Col>
            </Row>
        </>
    );
}

/**
 * FileUpload Component: Handles file upload and passes data to parent component.
 */
function FileUpload(props) {
    const input = useRef(null);

    /**
     * Upload the selected file
     * @param {File} file - The file to upload
     */
    const uploadFile = (file) => {
        const form = new FormData();
        form.append("file", file);
        API.uploadWorkflow(form)
            .then(json => {
                props.handleData(json);
            })
            .catch(err => console.log(err));
        input.current.value = null;
    };

    /**
     * Handle file selection
     * @param {Object} e - The event object from file input
     */
    const onFileSelect = (e) => {
        e.preventDefault();
        if (!input.current.files) return;
        uploadFile(input.current.files[0]);
    };

    return (
        <>
            <input
                type="file"
                ref={input}
                onChange={onFileSelect}
                style={{ display: "none" }}
            />
            <Button size="sm" onClick={() => input.current.click()}>Load</Button>
        </>
    );
}

export default Workspace;
