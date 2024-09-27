import React from 'react';
import { Divider, TextInput, Select,  SelectItem } from '@tremor/react';
import { useState, useEffect } from 'react';
import JsonTree from './JsonTree';
import ModelSelect from './ModelSelect';
import JMESPathTester from './JMESPathTester';

import * as API from '../API';

const InstanceEditor = (params) => {

    const [dirty, setDirty] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const instance_id = params?.instance_id;

    let hasInstanceId = false;

    if (instance_id != undefined) {
        //only fetch data if we have a instance id
        const init = () => {
            API.getInstance(instance_id).then(res=>{
                console.log(res.data.json_data);
                var json_data = JSON.parse(res.data.json_data.replace(/'/g, '"'));
                if (json_data.length === 0 || Object.keys(json_data).length === 0) {
                  json_data = []
              }                
                setInputFields(json_data);
            })
        }
        useEffect(()=>{
            init()
        },[])
        hasInstanceId = true;
    }


    const handleChangeInput = (index, event) => {
      const values = [...inputFields];
      values[index][event.target.name] = event.target.value;
      setInputFields(values);
    };

    const handleClose = (handleCloseHandler) => {
      //close the modal now
      handleCloseHandler();
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inputFields);

      // create a new `Date` object
      const now = new Date();
      // get the current date and time as a string
      const currentDateTime = now.toLocaleString();

      const inputs = {
        "name": "instance - " + currentDateTime,
        "description": "instance descriptipn", 
        "json_data" : JSON.stringify(inputFields)
       } 

      if (hasInstanceId) {
          //we have an id here
          const response = await API.updateInstance(instance_id, inputs);
          console.log(response);
      }
      else {
          // Logic to send the form data to the server
          const response = await API.addInstance(inputs);
          console.log(response);
      }
      //navigate("/instances");
    };

    
    const handleDrop = (index, event) => {
      setDirty(true);
      console.log(event.target.name);      
      const dropValue = event.dataTransfer.getData('field_inner_html').replace(/(<([^>]+)>)/gi, '');   
      
      const values = [...inputFields];
      values[index][event.target.name] = dropValue;
      setInputFields(values);
    }

    const handleDragOver = (e) => {
      e.preventDefault();
    }

    const handleValueChange = (value) => {
      console.log("handleValueChange");
    
      if (dirty && confirm("This will delete your work!") == false) {
        return;
      }

      // Replace single quotes with double quotes and parse JSON
      let jsonDataArray;
      try {
        jsonDataArray = JSON.parse(value.replace(/'/g, '"'));
      } catch (error) {
        console.error("Invalid JSON format:", error);
        return;
      }
    
      // Transform the array
      const newModelArray = jsonDataArray.map(element => ({
        fieldName: element.fieldName,
        fieldDatatype: element.fieldDatatype,
        fieldValue: ""
      }));
    
      setInputFields(newModelArray);
    };

    return (
    <div className="ModelEditor">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h1>Map the json fields to data model</h1>
                <div className="container mx-auto p-4">
                <ModelSelect onValueChange={handleValueChange}/>
                </div>

            <div className="container mx-auto p-4">
            <form onSubmit={(event) => {handleSubmit(event); handleClose(params.handleClose);}} className="space-y-4">
                {inputFields.map((inputField, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <TextInput
                    name="fieldName"
                    placeholder="Field Name"
                    disabled={true}
                    value={inputField.fieldName}
                    className="form-input px-4 py-2 rounded border"
                    />

                    <TextInput
                    name="fieldDatatype"
                    placeholder="Field Data Type"
                    disabled={true}
                    value={inputField.fieldDatatype}
                    className="form-input px-4 py-2 rounded border"
                    />

                    <TextInput
                    name="fieldValue"
                    placeholder="Field Value"
                    value={inputField.fieldValue}
                    onDrop={(event) => handleDrop(index, event)}
                    onDragOver={handleDragOver}                
                    onChange={(event) => handleChangeInput(index, event)}
                    className="form-input px-4 py-2 rounded border"
                    />

                </div>
                ))}
                <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                Send
                </button>
            </form>
            </div>


            </div>
            <div>
                <JMESPathTester/>
            </div>

        </div>
    </div>

    );
};
    
export default InstanceEditor