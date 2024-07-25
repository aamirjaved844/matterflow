import React from 'react'
import { Link } from 'react-router-dom'
import { timeTag, truncate } from '../lib/formatters'
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import * as API from '../API';


const FlowForm = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const {flow_id} = useParams();
    let hasFlowId = false;

    if (flow_id != undefined) {
        //only fetch data if we have a flow id
        const init = () => {
            API.getFlow(flow_id).then(res=>setInputs(values => ({...res.data})))
        }
        useEffect(()=>{
            init()
        },[])
        hasFlowId = true;
    }

  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if ('id' in inputs) {
            //we have an id here
            const response = await API.updateFlow(inputs['id'], inputs);
            console.log(response);
        }
        else {
            // Logic to send the form data to the server
            const response = await API.addFlow(inputs);
            console.log(response);
        }
        navigate("/flows");
      };

    

    const renderIdInput = () => {
        if (hasFlowId) {
          return <input type="text" name="id"  value={inputs.id || ''} readonly/>;
        } else {
          return <></>;
        }
    }

    return (
      <form onSubmit={handleSubmit}>
            {renderIdInput()}
            <input type="text" name="name" placeholder={"enter flow name"} value={inputs.name || ''} onChange={handleChange} />
            <input type="text" name="description" placeholder={"enter flow description"} value={inputs.description || ''} onChange={handleChange} />
            <input type="text" name="json_data" placeholder={"enter flow json_data"} value={inputs.json_data || ''} onChange={handleChange} />
            <button type="submit">Submit</button>
      </form>
      
    )
  }

export default FlowForm
