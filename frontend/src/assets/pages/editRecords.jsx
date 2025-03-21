

import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const editRecords = () => {
  const [ID, setID] = useState('');
  const [VetName, setVetName] = useState('');
  const [Treatment, setTreatment] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/record/${id}`)
    .then((response) => {
        setID(response.data.ID);
        setVetName(response.data.VetName)
        setTreatment(response.data.Treatment)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])
  
  const handleEditRecord = async () => {
  const data = {
    ID,
    VetName,
    Treatment,
    date, 
  };

  setLoading(true);

  try {
    const response = await fetch(`http://localhost:3000/record/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    enqueueSnackbar("Record Edited successfully", { variant: "success" });
    navigate("/");
  } catch (error) {
    enqueueSnackbar("Error updating record", { variant: "error" });
    console.error("Request failed:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit record</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ID</label>
          <input
            type='text'
            value={ID}
            onChange={(e) => setID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>VetName</label>
          <input
            type='text'
            value={VetName}
            onChange={(e) => setVetName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Treatent</label>
          <input
            type='text'
            value={Treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type='Date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleEditRecord}>
          Save
        </button>
      </div>
    </div>
  )
}

export default editRecords



