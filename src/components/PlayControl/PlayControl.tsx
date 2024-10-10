// Bootstrap Icons =========================================
import {
    BsPauseCircle,
    BsPlayCircle,
    BsSkipEndFill,
    BsSkipStartFill,

} from 'react-icons/bs';

// Types
import { MusicDetailsType } from '../../types/MusicDetailsTypes';

// Types
interface PlayControlType {
    onClick: () => void,
    isAudioPlay: boolean,
    allMusics: Array<MusicDetailsType>,
    handlePrevSong: ()=> void
    handleNextSong: ()=>void
}


const PlayControl: React.FC<PlayControlType> = ({ 
    onClick, 
    isAudioPlay, 
    handlePrevSong, 
    handleNextSong,
 }) => {
   

    // Change playstate icon
    let playState;
    if (isAudioPlay) {
        playState = (
            <BsPauseCircle
                className='text-4xl  mx-2'
                onClick={onClick}
            />
        )
    } else {
        playState = (
            <BsPlayCircle
                className='text-4xl  mx-2'
                onClick={onClick}
            />
        )
    }

    return (
        <div className='flex items-center cursor-pointer text-white'>
            <BsSkipStartFill 
                className='text-3xl' 
                onClick={handlePrevSong}
            />
            
            {playState}

            <BsSkipEndFill
                className='text-3xl'
                onClick={handleNextSong}
            />
        </div>
    );
}

export default PlayControl;