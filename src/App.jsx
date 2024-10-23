// App.jsx
import { useState, useEffect } from 'react';
import { index, create, update } from './components/services/trackService';
import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import TrackList from './components/Tracklist/TrackList';
import TrackDetails from './components/TrackDetails/TrackDetails';
import NavBar from './components/NavBar/NavBar';
import TrackForm from './components/TrackForm/TrackForm';

function App() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemTracks = async () => {
      try {
        const trackData = await index();
        console.log('trackData: ', trackData);
        setTracks(trackData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchThemTracks();
  }, []);

  const handleAddTrack = async (trackFormData) => {
    const newTrack = await create(trackFormData);
    setTracks([newTrack, ...tracks]);
    navigate('/tracks');
  };

  const handleUpdateTrack = async (trackId, trackFormData) => {
    const updatedTrack = await update(trackId, trackFormData);
    const updatedTracks = tracks.map(track => 
      track._id === trackId ? updatedTrack : track
    );
    setTracks(updatedTracks);
    navigate(`/tracks/${trackId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/tracks' />} />
        <Route path='/tracks' element={<TrackList tracks={tracks} />} />
        <Route path='/tracks/new' element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path='/tracks/:trackId' element={<TrackDetails />} />
        <Route path='/tracks/:trackId/edit' element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
      </Routes>
    </>
  );
}

export default App;
