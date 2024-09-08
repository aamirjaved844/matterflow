
/**
 * Sends request to server via fetch API and handles error cases
 * @param {string} endpoint - server endpoint
 * @param {Object} options - options parameter for `fetch` call
 * @returns {Promise<Object>} - server response or error
*/
function fetchWrapper(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
     fetch(endpoint, options)
         .then(async resp => {
             const data = await resp.json();
             //console.log(data);
             if (resp.ok) {
               return resolve(data);
             } else {
               return reject(data);
             }
         })
         .catch(err => {
             return reject(err);
         });
 });
}

/**
* Add connection to server-side workflow
* @param {ConnectionModel} node - connection to add
* @returns {Promise<Object>} - server response
*/
export async function addConnection(connection) {
  const payload = connection;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/connection/new", options);
}

/**
* Get available connections 
* @returns {Promise<Object>} - server response (connection items)
*/
export async function getConnections() {
  return fetchWrapper("/connection");
}

/**
* Update configuration of connection in server-side workflow
* @param {int} connection_id - connection_id to update
* @param {Object} config - configuration from options form
* @returns {Promise<Object>} - server response (serialized node)
*/
export async function updateConnection(connection_id, config) {
  const payload = config;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper(`/connection/${connection_id}`, options)
}

/**
 * Retrieve connection info from server side workflow
 * @param {string} connectionId - ID of node to retrieve
 * @returns {Promise<Object>} - server response (connection info)
 */
export async function getConnection(connectionId) {
  return fetchWrapper(`/connection/${connectionId}`);
}


/**
* Delete connection from server-side workflow
* @param {integer} connection_id - connection to remove
* @returns {Promise<Object>} - server response
*/
export async function deleteConnection(connection_id) {
  const options = {
      method: "DELETE"
  };
  return fetchWrapper(`/connection/${connection_id}`, options);
}


/**
* Get available processes 
* @returns {Promise<Object>} - server response (connection items)
*/
export async function getProcesses() {
  return fetchWrapper("/process");
}

/**
* Add process to server-side workflow
* @param {FlowModel} node - flow to make a new process
* @returns {Promise<Object>} - server response
*/
export async function addProcess(flow) {
  const payload = flow;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/process/new", options);
}


/**
* Add flow to server-side workflow
* @param {FlowModel} node - flow to add
* @returns {Promise<Object>} - server response
*/
export async function addFlow(flow) {
  const payload = flow;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/flow/new", options);
}

/**
* Get available flows 
* @returns {Promise<Object>} - server response (flow items)
*/
export async function getFlows() {
  return fetchWrapper("/flow");
}

/**
* Update configuration of flow in server-side workflow
* @param {int} flow_id - flow_id to update
* @param {Object} config - configuration from options form
* @returns {Promise<Object>} - server response (serialized node)
*/
export async function updateFlow(flow_id, config) {
  const payload = config;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper(`/flow/${flow_id}`, options)
}

/**
 * Retrieve flow info from server side workflow
 * @param {string} flowId - ID of node to retrieve
 * @returns {Promise<Object>} - server response (flow info)
 */
export async function getFlow(flowId) {
  return fetchWrapper(`/flow/${flowId}`);
}


/**
* Delete flow from server-side workflow
* @param {integer} flow_id - flow to remove
* @returns {Promise<Object>} - server response
*/
export async function deleteFlow(flow_id) {
  const options = {
      method: "DELETE"
  };
  return fetchWrapper(`/flow/${flow_id}`, options);
}

/**
* Get available models 
* @returns {Promise<Object>} - server response (connection items)
*/
export async function getModels() {
  return fetchWrapper("/model");
}

/**
* Add model to server-side workflow
* @param {FlowModel} node - flow to make a new model
* @returns {Promise<Object>} - server response
*/
export async function addModel(flow) {
  const payload = flow;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/model/new", options);
}

/**
* Update configuration of model in server-side workflow
* @param {int} model_id - model_id to update
* @param {Object} config - configuration from options form
* @returns {Promise<Object>} - server response (serialized node)
*/
export async function updateModel(model_id, config) {
  const payload = config;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper(`/model/${model_id}`, options)
}

/**
 * Retrieve model info from server side workflow
 * @param {string} modelId - ID of node to retrieve
 * @returns {Promise<Object>} - server response (model info)
 */
export async function getModel(modelId) {
  return fetchWrapper(`/model/${modelId}`);
}


/**
* Delete model from server-side workflow
* @param {integer} model_id - model to remove
* @returns {Promise<Object>} - server response
*/
export async function deleteModel(model_id) {
  const options = {
      method: "DELETE"
  };
  return fetchWrapper(`/model/${model_id}`, options);
}

/**
* Get available instances 
* @returns {Promise<Object>} - server response (connection items)
*/
export async function getInstances() {
  return fetchWrapper("/instance");
}

/**
* Add instance to server-side workflow
* @param {FlowModel} node - flow to make a new instance
* @returns {Promise<Object>} - server response
*/
export async function addInstance(flow) {
  const payload = flow;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/instance/new", options);
}

/**
* Update configuration of instance in server-side workflow
* @param {int} instance_id - instance_id to update
* @param {Object} config - configuration from options form
* @returns {Promise<Object>} - server response (serialized node)
*/
export async function updateInstance(instance_id, config) {
  const payload = config;
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper(`/instance/${instance_id}`, options)
}

/**
 * Retrieve instance info from server side workflow
 * @param {string} instanceId - ID of node to retrieve
 * @returns {Promise<Object>} - server response (instance info)
 */
export async function getInstance(instanceId) {
  return fetchWrapper(`/instance/${instanceId}`);
}


/**
* Delete instance from server-side workflow
* @param {integer} instance_id - instance to remove
* @returns {Promise<Object>} - server response
*/
export async function deleteInstance(instance_id) {
  const options = {
      method: "DELETE"
  };
  return fetchWrapper(`/instance/${instance_id}`, options);
}


/**
 * Offer data as a file download from the browser
 * @param {string} data - data to download
 * @param {string} contentType - MIME type
 * @param {string} fileName - name of downloaded file
 */
export function downloadFile(data, contentType, fileName) {
  const blob = new Blob([data], {type: contentType})
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName || "download";
  anchor.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Retrieve system info from server side 
 * @returns {Promise<Object>} - server response (system info)
 */
export async function getInfo() {
  return fetchWrapper(`/info`);
}


/**
 * Retrieve node info from server side workflow
 * @param {string} nodeId - ID of node to retrieve
 * @returns {Promise<Object>} - server response (node info and flow variables)
 */
export async function getNode(nodeId) {
  return fetchWrapper(`/node/${nodeId}`);
}


/**
* Add node to server-side workflow
* @param {CustomNodeModel} node - JS node to add
* @returns {Promise<Object>} - server response
*/
export async function addNode(node) {
  const payload = {...node.options, options: node.config};
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  return fetchWrapper("/node/", options);
}


/**
* Delete node from server-side workflow
* @param {CustomNodeModel} node - JS node to remove
* @returns {Promise<Object>} - server response
*/
export async function deleteNode(node) {
  const id = node.options.id;
  const options = {
      method: "DELETE"
  };
  const endpoint = node.options.is_global ? "node/global" : "node";
  return fetchWrapper(`/${endpoint}/${id}`, options);
}


/**
* Update configuration of node in server-side workflow
* @param {CustomNodeModel} node - JS node to remove
* @param {Object} config - configuration from options form
* @param {Object} flowConfig - flow variable configuration options
* @returns {Promise<Object>} - server response (serialized node)
*/
export async function updateNode(node, config, flowConfig) {
  node.config = config;
  node.options.option_replace = flowConfig;
  const payload = {...node.options, options: node.config};
  const options = {
      method: "POST",
      body: JSON.stringify(payload)
  };
  const endpoint = node.options.is_global ? "node/global" : "node";
  return fetchWrapper(`/${endpoint}/${node.options.id}`, options)
}


/**
* Save front-end workflow and download server response as JSON file
* @param {Object} diagramData - serialized react-diagrams model
*/
export async function save(diagramData) {
  const payload = JSON.stringify(diagramData);
  const options = {
      method: "POST",
      body: payload
  };
  fetchWrapper("/workflow/save", options)
      .then(json => {
          downloadFile(JSON.stringify(json), "application/json",
              json.filename || "diagram.json")
      }).catch(err => console.log(err));
}

/**
* Save front-end workflow to server as JSON file
* @param {Object} diagramData - serialized react-diagrams model
*/
export async function saveToServer(diagramData) {
  const payload = JSON.stringify(diagramData);
  const options = {
      method: "POST",
      body: payload
  };
  fetchWrapper("/workflow/savetoserver", options)
      .then(json => {
          console.log(json);
      }).catch(err => console.log(err));
}

/**
* Get available nodes for node menu
* @returns {Promise<Object>} - server response (node menu items)
*/
export async function getNodes() {
  return fetchWrapper("/workflow/nodes");
}


/**
* Get global flow variables for workflow
* @returns {Promise<Object>} - server response (global flow variables)
*/
export async function getGlobalVars() {
  return fetchWrapper("/workflow/globals");
}


/**
* Start a new workflow on the server
* @param {DiagramModel} model - Diagram model
* @returns {Promise<Object>} - server response
*/
export async function initWorkflow(model) {
  const options = {
      method: "POST",
      body: JSON.stringify({
          "id": model.options.id
      })
  };

  return fetchWrapper("/workflow/new", options);
}


/**
* Uploads JSON workflow file to server
* @param {FormData} formData - form with key `file` and value of type `File`
* @returns {Promise<Object>} - server response (full serialized workflow)
*/
export async function uploadWorkflow(formData) {
  const options = {
      method: "POST",
      body: formData
  };
  return fetchWrapper("/workflow/open", options);
}


async function handleEdge(link, method) {
  const sourceId = link.getSourcePort().getNode().options.id;
  const targetId = link.getTargetPort().getNode().options.id;

  let endpoint;

  if (link.getSourcePort().options.in) {
      // If edge goes from IN port -> OUT port, reverse the ports
      endpoint = `/node/edge/${targetId}/${sourceId}`;
  } else {
      // Otherwise, keep source -> target edge
      endpoint = `/node/edge/${sourceId}/${targetId}`;
  }

  return fetchWrapper(endpoint, {method: method});
}


/**
* Add edge to server-side workflow
* @param {MFLinkModel} link - JS edge to create
* @returns {Promise<Object>} - server response
*/
export async function addEdge(link) {
  return handleEdge(link, "POST");
}


/**
* Delete edge from server-side workflow
* @param {MFLinkModel} link - JS edge to delete
* @returns {Promise<Object>} - server response
*/
export async function deleteEdge(link) {
  return handleEdge(link, "DELETE");
}


/**
* Upload a data file to be stored on the server
* @param {FormData} formData - FormData with file and nodeId
* @returns {Promise<Object>} - server response
*/
export async function uploadDataFile(formData) {
  const options = {
      method: "POST",
      body: formData
  };
  return fetchWrapper("/workflow/upload", options);
}


/**
* Download file by name from server
* @param {CustomNodeModel} node - node containing file to download
* @returns {Promise<void>}
*/
export async function downloadDataFile(node) {
  // TODO: make this not a giant security problem
  let contentType;

  const payload = {...node.options, options: node.config};

  // can't use fetchWrapper because it assumes JSON response
  fetch(`/workflow/download`, {
      method: "POST",
      body: JSON.stringify(payload)
  })
      .then(async resp => {
          if (!resp.ok) return Promise.reject(await resp.json());
          contentType = resp.headers.get("content-type");
          let filename = resp.headers.get("Content-Disposition");

          if (contentType.startsWith("text")) {
              resp.text().then(data => {
                  downloadFile(data, contentType, filename);
              })
          }
      }).catch(err => console.log(err));
}


/**
* Get execution order of nodes in graph
* @returns {Promise<Object>} - server response (array of node IDs)
*/
export async function executionOrder() {
  return fetchWrapper("/workflow/execute");
}

/**
* Execute given node on server
* @param {CustomNodeModel }node - node to execute
* @returns {Promise<Object>} - server response
*/
export async function execute(node) {
  const id = node.options.id;
  return fetchWrapper(`/node/${id}/execute`);
}

/**
* Retrieves the data at the state of the specified node
* @param {string }nodeId - node identifier for an execution state
* @returns {Promise<Object>} - json respnse with the data at specified state
*/
export async function retrieveData(nodeId) {
return fetchWrapper(`/node/${nodeId}/retrieve_data`);
}
