import React, { useState } from 'react';
   import axios from 'axios';

   function App() {
     const [message, setMessage] = useState('');

     const testBackend = async () => {
       try {
         const response = await axios.get('http://localhost:5001/test');
         setMessage(response.data.message);
       } catch (error) {
         setMessage('Error connecting to backend');
       }
     };

     return (
       <div>
         <h1>DashRover</h1>
         <button onClick={testBackend}>Test Backend Connection</button>
         <p>{message}</p>
       </div>
     );
   }

   export default App;