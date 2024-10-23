import { Link } from 'react-router-dom';

const TrackList = ({ tracks }) => {
  return (
    <div className='card'>
      {tracks.map((track) => (
        <div key={track._id}>
          <h3>{track.title}</h3>
          <Link to={`/tracks/${track._id}`}>View Details</Link>
          <br/>
          <Link to={`/tracks/${track._id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TrackList;