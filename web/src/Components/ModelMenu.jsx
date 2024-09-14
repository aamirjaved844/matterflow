import React from 'react'
import ModelAndInstanceList from './ModelAndInstanceList'

const ModelMenu = () => {
  return (
    <div className="FlowMenu">
        <h3>Modelling Menu</h3>
        <div>Define your data models and instances.</div>
        <hr />
        <ModelAndInstanceList/>    
    </div>
  )
}

export default ModelMenu