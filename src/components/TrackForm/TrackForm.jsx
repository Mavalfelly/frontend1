
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { show } from '../services/trackService';

const TrackForm = (props) => {
  const { trackId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    coverArtUrl: "",
  });

 
  useEffect(() => {
    if (trackId) {
      const fetchTrack = async () => {
        try {
          const trackData = await show(trackId);
          setFormData(trackData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrack();
    }
  }, [trackId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackId) {
      props.handleUpdateTrack(trackId, formData);
    } else {
      props.handleAddTrack(formData);
    }
  };

  return (
    <main>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>

          <label htmlFor="title-input">Title: </label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="artist-input">Artist: </label>
          <input
            required
            type="text"
            name="artist"
            id="artist-input"
            value={formData.artist}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="coverArtUrl-input">Cover Art: </label>
          <input
            type="text"
            name="coverArtUrl"
            id="coverArtUrl-input"
            value={formData.coverArtUrl}
            onChange={handleChange}
          />
          <br />
          <button type="submit">{trackId ? "Update Track" : "Add Track"}</button>
        </form>
      </div>
    </main>
  );
};

export default TrackForm;