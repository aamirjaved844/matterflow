import { Button, Dialog, DialogPanel } from '@tremor/react';
import React from 'react';

const DialogConfirmation = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);  
    return (    
    <>    
    <Button className="mx-auto block" onClick={() => setIsOpen(true)}>{props.mainMessage}</Button>
    <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
            <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">{props.mainMessage}</h3>
            <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">{props.subMessage}</p>
            
            <div className="p-2 flex">
    <div className='w-full'>
        <Button className="mt-8 w-auto float-left" onClick={() => { props.confirmationHandler(props.id); setIsOpen(false)}}> Got it! </Button>      
        <Button className="mt-8 w-auto float-right" onClick={() => { setIsOpen(false)}}> Cancel </Button>      
    </div>
    </div>            
        </DialogPanel>    
    </Dialog>    
    </>  
);}

export default DialogConfirmation
