import React from 'react'
import { Tabs, Tab } from "react-bootstrap";
import ModelList from './ModelList';
import InstanceList from './InstanceList';

const ModelsInstancesList = () => {
    return (
        <div>
          <Tabs defaultActiveKey="models" id="model-instance-tabs" className="mb-3">
            <Tab eventKey="models" title="Models">
                <ModelList />
            </Tab>
    
            <Tab eventKey="instances" title="Instances">
                <InstanceList />
            </Tab>
          </Tabs>
        </div>
      );
    
}

export default ModelsInstancesList