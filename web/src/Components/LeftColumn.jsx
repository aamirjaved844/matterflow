import React from 'react'
import CardItem from './CardItem'
import MyChart from './MyChart';
import MyTable from './MyTable';


export const LeftColumn = () => {
  return (
    <div className='w-full flex flex-col justify-between p-2'>
        <div className='flex flex-col lg:flex-row gap-2 w-full'>
            <CardItem/>
            <CardItem/>
            <CardItem/>
        </div>
        <div className='flex-auto w-full'>
            <MyChart />
            <MyTable />
        </div>
    </div>
  )
}
