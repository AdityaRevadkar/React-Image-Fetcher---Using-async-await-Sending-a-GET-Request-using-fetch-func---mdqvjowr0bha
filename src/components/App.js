import React from 'react'
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';
import {useState,useEffect} from 'react';
const App = () => {
   const [inputNumber, setInputNumber] = useState('');
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (inputNumber >= 1 && inputNumber <= 5000) {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${inputNumber}`);
        const data = await response.json();
        setPhotoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photo data:', error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputNumber]);

  return (
    <div className="App">
      <input
        type="number"
        placeholder="Enter a number between 1-5000"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
      />

      {loading ? (
        <Loader />
      ) : (
        photoData && (
          <PhotoFrame url={photoData.url} title={photoData.title} />
        )
      )}
    </div>
  );
}


export default App;
