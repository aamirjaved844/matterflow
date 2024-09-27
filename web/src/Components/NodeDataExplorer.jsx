import React, { useState } from "react";
import * as API from '../API';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

const DropdownMenu = ({ depthLevel, isSubmenu, menuItems, title }) => {


    return (
        <DropdownButton
            as={ButtonGroup}
            drop={'end'}
            variant={'success'}
            title={title}
          >
            {
              menuItems.map((menuItem, index) => {
                if (menuItem.submenu && menuItem.submenu.length > 0) {
                  return <div key={`${depthLevel}_${index}`} className='subMenuLevel'>
                    <DropdownMenu depthLevel={depthLevel+1} title={menuItem.title} menuItems={menuItem.submenu} isSubmenu={true} />
                  </div>
                } else {
                  return <Dropdown.Item key={`${depthLevel}_${index}`} eventKey={`${depthLevel}_${index}`} onClick={() => {if(menuItem.action) {menuItem.action(menuItem)}}}>{menuItem.title}</Dropdown.Item>
                }
              })
            }
          </DropdownButton>
      )    

}

const NodeDataExplorer = () => {
    const depthLevel = 0
    const isSubmenu = false 
    const title = "Node Data Explorer"; // title
    const menuItems = [
        {
        "title": "Option 1",
        "submenu": null,
        "action": (itemClicked) => {
            alert('Clicked Option 1')
            }
        },
        {
        "title": <span style={{color: 'red'}}>Option 2</span>,
        "submenu": [
            {
            "title": <span style={{width: '130px', fontWeight: 'bold'}}>&nbsp;Please add me</span>,
            "submenu": [
                {
                "title": "Option 2.1.1",
                "submenu": null,
                "action": (itemClicked) => {
                    alert("Clicked Option 2.1.1")
                }
                },
                {
                "title": "Option 2.1.2",
                "submenu": [
                    {
                    "title": "Option 2.1.2.1",
                    "submenu": null
                    },
                    {
                    "title": "Option 2.1.2.2",
                    "submenu": null
                    }
                ]
                }
            ]
            },
            {
            "title": "Option 2.2",
            "submenu": [
                {
                "title": "Option 2.2.1",
                "submenu": null
                },
                {
                "title": "Option 2.2.2",
                "submenu": null
                }
            ]
            }
        ]
        }
    ];

    const handleWorkflowQuery = (event) => {
        API.getFlows().then((value) => {
//            document.getElementById("flows").innerHTML = JSON.stringify(value, null, 2);
            for (let i = 0; i < value.data.length; i++) {
                alert(JSON.stringify(value.data[i]));
            }
        });
    }

    return (
        <>
                    <DropdownMenu depthLevel={depthLevel+1} title={title} menuItems={menuItems} isSubmenu={isSubmenu} />
                    <div className='flex'>
                <div onClick={handleWorkflowQuery}>Get Node Data</div>                
            </div>
        </>
    )

};

export default NodeDataExplorer