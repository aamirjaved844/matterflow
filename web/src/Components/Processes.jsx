import React from 'react'
import { Link } from 'react-router-dom'
import { timeTag, truncate } from '../lib/formatters'
import { useState, useEffect } from 'react';
import * as API from '../API';
import DialogConfirmation from './DialogConfirmation';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await API.getProcesses();
          console.log(response.data)
          setData(JSON.parse(response.data));
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


const Processes = () => {

    const { data, loading, error } = useFetch();

    const handleDelete = async (process_id) => {
    }
    
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
            <div>There are no process entries. <Link to={`/processes/edit`} className="rw-button rw-button-small">Create one now?</Link></div>
        );
    }

    return (
        <div className="rw-segment rw-table-wrapper-responsive">
          <table className="rw-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {data.map((process) => (

                <tr key={process.pid}>
                  <td>{truncate(process.pid)}</td>
                  <td>{truncate(process.name)}</td>
                  <td>{truncate(process.description)}</td>
                  <td>{truncate(process.statename)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
}

export default Processes