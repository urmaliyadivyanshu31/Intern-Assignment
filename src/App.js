import './App.css';
import React, { useState, useEffect } from "react";
import Modal from './components/modal';
// import {Routes, Route, useNavigate} from 'react-router-dom';
// import Datepicker from 'flowbite-datepicker/Datepicker';




function App() {

  const [payloads, setPayloads] = useState([]);
  const [durations, setDurations] = useState([]);
  const [selectedPayload, setSelectedPayload] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [fetchBlockHours, setFetchBlockHours] = useState([]);





  const apiUrl1 = "http://api.internship.appointy.com:8000/space-payload/v1/durations";
  const apiUrl2 = "http://api.internship.appointy.com:8000/space-payload/v1/payloads";
  // const apiUrl3 = "http://api.internship.appointy.com:8000/space-payload/v1/block-hours/"
 




  const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDIzLTA4LTEwVDAwOjAwOjAwWiIsInVzZXJfaWQiOjgyfQ.OCZki4GhxuOWrzy-Wp2RtMh8GucnZUXSBuzY39Xbqdo"
  ;
  
  const [isOpen, setIsOpen] = useState(false);




  useEffect(() => {
    // Fetch durations
    async function fetchDurations() {
    const response = await fetch(apiUrl1, {
      method: "GET",
      headers: {
        Authorization: authToken,
        Origin: "http://appointy.com", // Add your website's domain here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data
        
      })
      .then((data) => {
        setDurations(data); // Update the state with the fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
      console.log(response);
    }
    fetchDurations();

    // Fetch payloads

    async function fetchPayloads() {
    const response = await fetch(apiUrl2, {
      method: "GET",
      headers: {
        Authorization: authToken,
        Origin: "http://appointy.com", // Add your website's domain here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON data

      })
      .then((data) => {
        setPayloads(data); // Update the state with the fetched data
        console.log(data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
      console.log(response);
    }
    fetchPayloads(); 
    setLoading(false);
  }, []); 

  // async function fetchBlockHours() {
  //   const response = await fetch(apiUrl3, {
  //     method: "POST",
  //     headers: {
  //       Authorization: authToken,
  //       Origin: "http://appointy.com", // Add your website's domain here
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       payload_id: selectedPayload.id,
  //       duration: selectedDuration,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json(); // Parse the JSON data
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("There has been a problem with your fetch operation:", error);
  //     }
  //     );
  //     console.log(response);
  // }
  // fetchBlockHours();


  const handleFetchWorkingHours = () => {
    // Perform action based on selectedPayload and selectedDuration
    console.log("Selected Payload:", selectedPayload);
    console.log("Selected Duration:", selectedDuration);
   
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="App">
    <div className='container'>
      <div className='container-inner p-8 pb-4'>
      <h1 class="mb-4 ml-12 pt-5 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Space Payload</span> Booking System</h1>
      </div>
      <p class="mb-6 text-lg font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">Conduct your own experiments using specific payloads of Chandrayan-3 </p>

      <div class="space-y-6 mt-11" action="#">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Select Appointmnet Type</h5>
    </div>
    <div className='block max-w ml-40 mt-8 pt-8 pb-8 pr-4 pl-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-70'>
      <ul className='gap-5 '>
        <li className='flex flex-wrap justify-between m-3 items-center gap-9'>
          <h3>RAMBHA</h3>
          <button onClick={() => setIsOpen(true)} className='text-bold text-center'>
        Open for RAMBHA
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}

        </li>
        <li className='flex flex-wrap justify-between m-3 items-center gap-9'>
          <h3>LRA</h3>
          <button onClick={() => setIsOpen(true)}>
        Open for LRA
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
        </li>
        <li className='flex flex-wrap justify-between m-3 items-center gap-9'>
          <h3>ChaSTE</h3>
          <button onClick={() => setIsOpen(true)}>
        Open for ChaSTE
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
        </li>
      </ul>
</div>

    </div>


    <div className="App">
      <h1>Select Payload:</h1>
      <select onChange={(e) => setSelectedPayload(JSON.parse(e.target.value))}>
        <option value="">Select Payload</option>
        {payloads.map((payload) => (
          <option key={payload.id} value={JSON.stringify(payload)}>
            {payload.name}
          </option>
        ))}
      </select>

      <h1>Select Duration:</h1>
      <select onChange={(e) => setSelectedDuration(e.target.value)}>
        <option value="">Select Duration</option>
        {durations.map((duration, index) => (
          <option key={index} value={duration.seconds}>
            {duration.seconds} seconds
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleFetchWorkingHours}>Get Working Hours</button>


    </div>


    
    </div>
  );
}

export default App;
