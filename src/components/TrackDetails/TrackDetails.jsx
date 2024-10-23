import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { show } from "../services/trackService";

const TrackDetails = () => {
    const { trackId } = useParams();
    const [track, setTrack] = useState(null);

    useEffect(() => {
        const getTrack = async () => {
            try {
                const trackData = await show(trackId);
                console.log('trackData', trackData);
                setTrack(trackData);
            } catch (error) {
                console.error('Error fetching track details:', error);
            }
        };
        getTrack();
    }, [trackId]);

    return (
        <main>
            <header>
                {track ? (
                    <>
                        <h2>Title: {track.title}</h2>
                        <h3>Artist: {track.artist}</h3>
                    </>
                ) : (
                    <p>Loading track details...</p>
                )}
            </header>
        </main>
    );
};

export default TrackDetails;