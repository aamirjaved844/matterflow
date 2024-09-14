import React from 'react'
import ModelsInstancesList from './ModelsInstancesList'

const ModelMenu = () => {
  return (
    <div className="FlowMenu">
        <h3>Modelling Menu</h3>
        <div>Define your data models and instances.</div>
        <hr />
        <ModelsInstancesList/>    
    </div>
  )
}

export default ModelMenu