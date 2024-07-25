import React from 'react'
import { ArrowUpIcon, BellIcon, ChartBarIcon, CreditCardIcon, DocumentSearchIcon, ExternalLinkIcon, HomeIcon, MailIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-slate-800 flex-none w-14 sm:w-20 h-screen'>
        <div className='h-20 items-center flex'>
            <Link to="/" relative="path">
                <HomeIcon width={40} className='text-gray-300 left-3 sm:left-6 fixed'/>
            </Link>
        </div>
        <div className='fixed left-3 sm:left-6 top-[100px]'>
            <Link to="/flows" relative="path">
                <ChartBarIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </Link> 

            <Link to="/connections" relative="path">
                <DocumentSearchIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </Link> 

            <Link to="/processes" relative="path">
                <MailIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </Link> 

            <Link to="/models" relative="path">
                <CreditCardIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </Link> 

            <Link to="/instances" relative="path">
                <BellIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </Link> 
            </div>
        <div className='fixed bottom-4 left-3 sm:left-6'>
            <a href="#top">
                <ArrowUpIcon 
                    width={40} 
                    className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
                />
            </a>
            <ExternalLinkIcon 
                width={40} 
                className='bg-gray-600 p-2 rounded-lg mb-4 text-gray-300'
            />
        </div>


    </div>
  )
}

export default Sidebar