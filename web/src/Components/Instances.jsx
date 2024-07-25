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
          const response = await API.getInstances();
          console.log(response.data)
          console.log(typeof(response.data))
          if(typeof bar === 'string') {
            //if the returned data is a string lets try to parse to json
            //before setting the data
            setData(JSON.parse(response.data));
          }
          else {
            setData(response.data);
          }
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


const Instances = () => {

    const { data, loading, error } = useFetch();

    const handleDelete = async (instance_id) => {
      const response = await API.deleteInstance(instance_id);
      window.location.reload();
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
            <div>There are no instance entries. <Link to={`/instances/edit`} className="rw-button rw-button-small">Create one now?</Link></div>
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
            <th>JSON</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((instance) => (
            <tr key={instance.id}>
              <td>{truncate(instance.id)}</td>
              <td>{truncate(instance.name)}</td>
              <td>{truncate(instance.description)}</td>
              <td>{truncate(instance.json_data)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link to="" className="rw-button rw-button-small">
                        Show
                  </Link>
                  <Link to={`/instances/edit/${instance.id}`} className="rw-button rw-button-small">
                    Edit
                  </Link>
                  <DialogConfirmation id={instance.id} mainMessage={'Delete?'} subMessage={'This action cannot be undone!'} confirmationHandler={handleDelete} />
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Instances