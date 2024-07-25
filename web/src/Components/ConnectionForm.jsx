import React from 'react'
import { Link } from 'react-router-dom'
import { timeTag, truncate } from '../lib/formatters'
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import * as API from '../API';



const ConnectionForm = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const {connection_id} = useParams();
    let hasConnectionId = false;

    if (connection_id != undefined) {
        //only fetch data if we have a connection id
        const init = () => {
            API.getConnection(connection_id).then(res=>setInputs(values => ({...res.data})))
        }
        useEffect(()=>{
            init()
        },[])
        hasConnectionId = true;
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
            const response = await API.updateConnection(inputs['id'], inputs);
            console.log(response);
        }
        else {
            // Logic to send the form data to the server
            const response = await API.addConnection(inputs);
            console.log(response);
        }
        navigate("/connections");
      };

    

    const renderIdInput = () => {
        if (hasConnectionId) {
          return <input type="text" name="id"  value={inputs.id || ''} readonly/>;
        } else {
          return <></>;
        }
    }

    return (
      <>
      <form onSubmit={handleSubmit}>
            {renderIdInput()}
            <input type="text" name="name" placeholder={"enter connection name"} value={inputs.name || ''} onChange={handleChange} />
            <input type="text" name="description" placeholder={"enter connection description"} value={inputs.description || ''} onChange={handleChange} />
            <input type="text" name="json_data" placeholder={"enter connection json_data"} value={inputs.json_data || ''} onChange={handleChange} />
            <button type="submit">Submit</button>
      </form>

      </>
    )
  }

export default ConnectionForm
