


import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

  const CreateRecord = () => {
  const [ID, setID] = useState('');
  const [VetName, setVetName] = useState('');
  const [Treatment, setTreatment] = useState('');
  const [date, setdate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecord = () => {
    const data = {
      ID,
      VetName,
      Treatment,
      date,
    };
    setLoading(true);
    axios
      .post('http://localhost:3000/record', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Record Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Record</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>ID</label>
          <input
            type='text'
            onChange={(e) => setID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>VetName</label>
          <input
            type='text'
            onChange={(e) => setVetName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Treatment</label>
          <input
            type='text'
            onChange={(e) => setTreatment(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>date</label>
          <input
            type='date'
            onChange={(e) => setdate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveRecord}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateRecord;

