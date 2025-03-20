/*

import React from 'react'

export default function PetRecord() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl front-semibold text-center my-7'>Create a Record</h1>
        <h2 className='text-l front-semibold text-left'>Pet Info</h2>
        <form className='flex flex-col sm:flex-row'>
            <div className='flex flex-col sm:flex-row'> 
                <input type='text-l' placeholder='Pet ID' 
                className='border p-2 rounded-lg mb-3 max-w-15' id='name' maxLength='5' min={5} required/>
                </div>
            
        <div>
          <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>Get pet Info</button>
        </div>
  
                </form> 
                 <h2 className='text-l front-semibold text-left'>Speacies</h2>

                 <div className='flex gap-7 flex-wrap'>
                  <div className='flex gap-3'>
                    <input type='checkbox' id='Dog' className='w-4'/>
                    <span>
                      Dog
                    </span>
                  </div>

                
                  <div className=' flex gap-2'>
                    <input type='checkbox' id='Cat' className='w-4'/>
                    <span>
                      Cat
                    </span>
                  </div>

                
                  <div className='flex gap-2'>
                    <input type='checkbox' id='Other' className='w-4'/>
                    <span>
                      Other
                    </span>
                  </div>

                </div>
                
            
                <h2 className='text-l front-semibold text-ellipsis'>Gender</h2>
              
            <div className='flex gap-7 flex-wrap'>
             
              <div className='flex gap-2'>  
                <input type='checkbox' id='male' className='w-4'/>
                <span>
                  male
                </span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='female' className='w-4'/>
                <span>
                  female
                </span>
              </div>
              </div>
                
              <form className='flex gap-6' flex-wrap>
              <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Breed'
                className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
             
                <input type='text' placeholder='Weight'
                className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
              </div>
                  </form>  

          <div className=''>
            <div className='flex items-center gap-2'>
                <input type='number' id='Age' max={15} min={0}required
                className='p-2 border border-gray-400 rounded-lg'/>
                <p>Age</p>
            </div>

          </div>


      

    


        <h4 className='text-xl front-semibold text'>Owner Info</h4>
        <form className='flex flex-col sm:flex-row'>
           <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Owner Name' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={2} required/>
              <input type='text' placeholder='NIC number' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
              <input type='text' placeholder='Address' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
              <input type='text' placeholder='Phone number'
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>

            </div>


        </form>

    

        
        <h2 className='text-xl front-semibold text'>Visit Details</h2>



        <form className='flex flex-col sm:flex-row'>
           <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Date and time' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={2} required/>
              <input type='text' placeholder='Reason for visit'
               className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
            </div> 
            </form>

        
        
    

        <h4 className='text-xl front-semibold text'> Examination Findings</h4>
        <form className='flex flex-col sm:flex-row'>
           <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Physical Exam Results (Temperature, Heart Rate, Respiration, etc.)' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={2} required/>
              <input type='text' placeholder='Symptoms Observed' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
              <input type='text' placeholder='Diagnosis / Possible Conditions' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
        

            </div>


        </form>

        <h4 className='text-xl front-semibold text'>Treatment Given</h4>
        <form className='flex flex-col sm:flex-row'>
           <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Medications Prescribed (Name, Dosage, Frequency, etc.)'
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={2} required/>
              <input type='text' placeholder='Procedures Performed (Wound Cleaning, Surgery, etc.)' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
              <input type='text' placeholder='Vaccinations Given' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
        

            </div>


        </form>


        <h4 className='text-xl front-semibold text'>Veterinarian's Notes</h4>
        <form className='flex flex-col sm:flex-row'>
           <div className='flex flex-col sm:flex-row'>
              <input type='text' placeholder='Recommendations'
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={2} required/>
              <input type='text' placeholder='Additional Observations' 
              className='border p-2 rounded-lg mb-3' id='name' maxLength='62' min={10} required/>
             
        

            </div>


        </form>

        <h4 className='text-xl front-semibold text'>Veterinarian's name, Signature and License Number</h4>

        <div>
          <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95'>Submit</button>
        </div>
  
    </main>
  )
}

*/