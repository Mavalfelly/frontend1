import { Link } from 'react-router-dom';

const TrackList = ({ tracks, handleDeleteTrack, handlePlayTrack }) => {
  return (
    <div className='card-container' >
      {tracks.map((track) => (
        <div key={track._id} className='card'>
            <h3 className='title'>{track.title} by {track.artist}</h3>
            <div className='button'>
                <button onClick={() => handlePlayTrack(track)}>Play</button>
                <Link to={`/tracks/${track._id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;