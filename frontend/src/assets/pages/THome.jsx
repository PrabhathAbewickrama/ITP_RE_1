import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle  } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';



const THome = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:3000/record')
          .then((response) => {
              setRecords(response.data.data);
              setLoading(false);
          })
          .catch((error) => {
              console.log(error);
              setLoading(false);
          });

    }, []);

  return (  
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Pet Records</h1>
        <Link to='./create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
          </Link>
        </div>
        {loading ? (<Spinner />) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead>
              <tr>
               <th className='border border-slate-600 rounded-md'>No</th>
                <th className='border border-slate-600 rounded-md'>ID</th>
                <th className='border border-slate-600 rounded-md '>Vet Name</th>
                <th className='border border-slate-600 rounded-md'>Treatment</th>
                <th className='border border-slate-600 rounded-md '>Date</th>
                <th className='border border-slate-600 rounded-md'>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {index + 1}
                    </td>
                    <td className='border border-slate-700 rounded-md text-center'>
                    {record.ID}
                    </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {record.VetName}
                    </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {record.Treatment}
                    </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    {new Date(record.date).toLocaleDateString()}
                    </td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                    <Link to={`/show/${record._id}`} className='text-blue-500 hover:underline'>
                      <BsInfoCircle />
                    </Link>
                   
                    <Link to={`/edit/${record._id}`} className='text-green-500 hover:underline'>
                      <AiOutlineEdit />
                    </Link>
                    <Link to={`/delete/${record._id}`} className='text-red-500 hover:underline'>
                      <MdOutlineDelete />
                    </Link>
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        )}
        </div>
  );
} ;


export default THome;