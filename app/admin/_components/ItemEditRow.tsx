import React, { useState } from 'react'
import { UpdateItem } from '../serverActions'

const ItemEditRow = ({table, itemDetail, updateFunc, deleteFunc}: {table: any, itemDetail:any, updateFunc: () => void, deleteFunc: (itemId:any) => void}) => {
    const [name, setName] = useState<string>(itemDetail.name);
    const [lat, setLat] = useState<string>(itemDetail.lat);
    const [lng, setLng] = useState<string>(itemDetail.lng);
    return (
    <div className='my-1 text-md'>
        <form className="grid grid-cols-5 my-1" action={(e: FormData) => {UpdateItem(e); updateFunc()}}>
            <input className='px-2 col-span-2' name='name' type="text"  value={name} onChange={e => setName(e.target.value)}/>
            <input className='px-2' name='lat' type="number"  value={lat} onChange={e => setLat(e.target.value)}/>
            <input className='px-2' name='lng' type="number"  value={lng} onChange={e => setLng(e.target.value)}/>
            <div className='grid grid-cols-2'>
                <input className='px-2 hover:bg-main rounded-md text-accent' type="submit" value="Update" />
                <input className='px-2 hover:bg-red-500 hover:text-white rounded-md text-red-700' type="button" value="Delete" onClick={() => {deleteFunc(Number(itemDetail.id)); updateFunc()}}/>

            </div>
                <input type="hidden" name="table" value={table} />
            <input type="hidden" name="id" value={itemDetail.id} />
        </form>
        {/* <form action={(e: FormData) => {deleteFunc(Number(itemDetail.id)); updateFunc()}}>
            <input type="submit"  value="DELETE"/>
        </form> */}
    </div>
  )
}

export default ItemEditRow
