// TrackForm.jsx
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

  // Load existing track data for editing
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
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        {/* Artist input */}
        <label htmlFor="artist-input">Artist</label>
        <input
          required
          type="text"
          name="artist"
          id="artist-input"
          value={formData.artist}
          onChange={handleChange}
        />
        <br />
        {/* Cover Art URL input */}
        <label htmlFor="coverArtUrl-input">Cover Art</label>
        <input
          type="text"
          name="coverArtUrl"
          id="coverArtUrl-input"
          value={formData.coverArtUrl}
          onChange={handleChange}
        />
        <br />
        {/* Submit button */}
        <button type="submit">{trackId ? "Update Track" : "Add Track"}</button>
      </form>
    </main>
  );
};

export default TrackForm;