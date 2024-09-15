import React from 'react'
import FlowList from './FlowList'

const FlowMenu = (props) => {
  return (
    <div className="FlowMenu" style={{ paddingTop: '20px' }}>
        <h3>Flow Menu</h3>
        <div>Control your flows.</div>
        <hr />
        <FlowList {...props} />    
    </div>
  )
}

export default FlowMenu