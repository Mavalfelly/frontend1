// App.jsx
import { useState, useEffect } from 'react';
import { index, create, update, remove} from './components/services/trackService';
import './App.css';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import TrackList from './components/Tracklist/TrackList';
import TrackDetails from './components/TrackDetails/TrackDetails';
import NavBar from './components/NavBar/NavBar';
import TrackForm from './components/TrackForm/TrackForm';

function App() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();
  const [nowPlaying, setNowPlaying] = useState(null)
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

  const handleDeleteTrack = async (trackId) =>{
    await remove(trackId);
    setTracks(tracks.filter((track) => track._id !== trackId));
  }

  const handleUpdateTrack = async (trackId, trackFormData) => {
    const updatedTrack = await update(trackId, trackFormData);
    const updatedTracks = tracks.map(track => 
      track._id === trackId ? updatedTrack : track
    );
    setTracks(updatedTracks);
    navigate(`/tracks`);
  };

  const handlePlayTrack = (track) =>{
    setNowPlaying(track)
  }  
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to='/tracks' />} />
        <Route path='/tracks' element={
              <TrackList  tracks={tracks}  
                          handleDeleteTrack={handleDeleteTrack}
                          handlePlayTrack={handlePlayTrack} />} />
        <Route path='/tracks/new' element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path='/tracks/:trackId' element={<TrackDetails />} />
        <Route path='/tracks/:trackId/edit' element={<TrackForm handleUpdateTrack={handleUpdateTrack} />} />
      </Routes>


      {nowPlaying && (
        <div className="now-playing">
          <h3>Now Playing:</h3>
          <p>{nowPlaying.title} by {nowPlaying.artist}</p>
          <img src={nowPlaying.coverArtUrl} alt={`${nowPlaying.title} cover art`} />
        </div>
      )}
    </>
  );
}

export default App;
