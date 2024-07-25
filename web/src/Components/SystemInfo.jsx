import React from 'react'
import { Button, Dialog, DialogPanel } from '@tremor/react';
import * as API from '../API';



const SystemInfo = () => {

    const [isOpen, setIsOpen] = React.useState(false);  
    const [systemInfo, setSystemInfo] = React.useState({});  

    /**
     * Retrieve available nodes from server to display in menu
     */
    const getSystemInfo = function () { 
        API.getInfo()
            .then(info => { console.log(info); setSystemInfo(info); setIsOpen(true) } )
            .catch(err => console.log(err));
    }

    return (    
    <>    
    <Button className="mx-auto block" onClick={() => getSystemInfo()}>Open Dialog</Button>    
    <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>      
        <DialogPanel>        
            <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">System Information</h3>        
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">  { JSON.stringify(systemInfo) } </p>        
            <Button className="mt-8 w-full" onClick={() => setIsOpen(false)}>          Got it!        </Button>      
        </DialogPanel>    
    </Dialog>    
    </>  
    );
}

export default SystemInfo