/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle  } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
//gyegfyefui


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

*/
/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const THome = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/record`, {
          params: {
            page: currentPage,
            limit: pageSize,
            search: searchQuery
          }
        });
        setRecords(response.data.data);
        setTotalPages(Math.ceil(response.data.total / pageSize));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [currentPage, pageSize, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Pet Records</h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search records..."
              className="px-4 py-2 border rounded-lg flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to="./create" className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2">
              <MdOutlineAddBox className="text-xl" />
              New Record
            </Link>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : records.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vet Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Treatment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.ID}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.VetName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.Treatment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/show/${record._id}`}
                            className="text-sky-600 hover:text-sky-800 transition-colors"
                            title="View Details"
                          >
                            <BsInfoCircle className="text-xl" />
                          </Link>
                          <Link
                            to={`/edit/${record._id}`}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Edit"
                          >
                            <AiOutlineEdit className="text-xl" />
                          </Link>
                          <Link
                            to={`/delete/${record._id}`}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <MdOutlineDelete className="text-xl" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
            /*
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, records.length)} of {records.length} results
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-2 py-1 border rounded-md text-sm"
                >
                  {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      currentPage === page
                        ? 'bg-sky-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default THome;

*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const THome = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/record`, {
          params: {
            page: currentPage,
            limit: pageSize,
            search: searchQuery
          }
        });
        setRecords(response.data.data);
        setTotalPages(Math.ceil(response.data.total / pageSize));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setLoading(false);
      }
    };

    fetchRecords();
  }, [currentPage, pageSize, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Pet Records</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search records..."
              className="px-4 py-2 border rounded-lg w-full sm:flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to="./create" className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              <MdOutlineAddBox className="text-xl" />
              New Record
            </Link>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : records.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Vet Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Treatment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">{record.ID}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">{record.VetName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">{record.Treatment}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 sm:px-6">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/show/${record._id}`}
                            className="text-sky-600 hover:text-sky-800 transition-colors"
                            title="View Details"
                          >
                            <BsInfoCircle className="text-lg sm:text-xl" />
                          </Link>
                          <Link
                            to={`/edit/${record._id}`}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Edit"
                          >
                            <AiOutlineEdit className="text-lg sm:text-xl" />
                          </Link>
                          <Link
                            to={`/delete/${record._id}`}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <MdOutlineDelete className="text-lg sm:text-xl" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-gray-700 text-center sm:text-left">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, records.length)} of {records.length} results
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-2 py-1 border rounded-md text-sm w-full sm:w-auto"
                >
                  {[10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:px-4"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-md text-sm sm:px-4 ${
                      currentPage === page
                        ? 'bg-sky-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-white border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:px-4"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default THome;