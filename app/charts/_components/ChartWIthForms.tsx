"use client";
import React, { useEffect, useState } from 'react'
import { getHourlyRequestCounts, HourlyRequestCount } from '../serverActions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mainColor } from '@/app/_constants/constants';


const ChartWIthForms = ({ items, table }: { items: { name: string, id: number }[], table: string }) => {

    const now = new Date();
    const [itemId, setItemId] = useState<number>(items[0].id);
    const [date, setDate] = useState<string>(`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
    const [data, setData] = useState<HourlyRequestCount[]>([]);

    useEffect(() => {
        const awaitData = async () => {
            getHourlyRequestCounts(date, itemId, table).then(setData);
        }
        awaitData();
    }, [itemId, date])
    return (
        <div className=''>
            <h1 className='lg:text-4xl text-3xl text-center mt-10'>{table.toUpperCase()} History</h1>
            <div className='grid lg:grid-cols-9 grid-cols-1 p-2'>
                {/* <div className='col-span-1'></div> */}
                <div className='col-span-2 flex flex-col p-6 text-2xl'>
                    <label htmlFor="dropdown" className='text-3xl py-3'>Choose {table}:</label>
                    <div className='border-2 border-main p-2 w-full'>
                        <select className='block border-2 border-main bg-main text-white p-2 w-full' id="dropdown" value={itemId} name="dropdown" onChange={e => setItemId(Number(e.target.value))}>
                            {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>

                    </div>
                    <input className='max-w-[] my-5 p-2' type="date" name="" id="" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className='bg-white rounded-md col-span-7 h-[30vh] p-2 shadow-lg'>
                    <ResponsiveContainer>
                        <LineChart width={1500} height={500} data={data} className=''
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke={mainColor} />
                        </LineChart>

                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default ChartWIthForms
