// Hooks ==================================
import { useRef, useState } from 'react';
// import useSpotifyToken from './hooks/spotifyToken';

// CSS ==================================
import './index.css'

// Musics
import Nair from './assets/music/first/Eu_vou_orar_.__Nair_Nany_(256k).mp3';
import wonder from './assets/music/first/Mercy_Chinwo_-_Wonder__Official_Video_(48k).mp3';
import eyano from './assets/music/first/Eyano(48k).mp3';
import oke from './assets/music/first/Mercy_Chinwo_-_Oke_Mmiri__Live_(256k).mp3';
import acessLove from './assets/music/first/Excess_Love__Remix___Official_Video____JJ_Hairston___Mercy_Chinwo(256k).mp3';


// components ==============================================
import PlayControl from './components/PlayControl/PlayControl';

// Axios
// import axios from 'axios';


export default function App() {

  // useState Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const [isAudioPlay, setIsAudioPlay] = useState(false);
  const [currentMusicObject, setCurrentMusicObject] = useState(MusicAPI[0]); // All musics variable
  const [musicIndex, setMusicsIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0);

  // useRef variable
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  
  // Getting Spotify token
  // const token = useSpotifyToken();

  // useEffect(()=> {
  //   // Function to get musics
  //   const fetchMusic = async () => {
  //     try {
  //       const response = await axios.get("")
  //     } catch (error) {
        
  //     }
  //   }

  // }, [])

  // Videos
  
  const videoArray = [
    'https://www.dropbox.com/scl/fi/l01yiy3dcfzkua91jtxy6/video2.mp4?rlkey=iq4jrg8hxk1gx6mcsh8z5efle&st=91hkw4v2&raw=1',
    'https://www.dropbox.com/scl/fi/xzpl8v08dg4ck0admdvts/6394054-uhd_4096_2048_24fps.mp4?rlkey=phmeuua2kuxbdc0zb7melqrhb&st=th6qpv1o&dl&raw=1',
    'https://www.dropbox.com/scl/fi/2gmwf2twkqlk9fe3kybkg/4068552-uhd_3840_2160_30fps.mp4?rlkey=qwiksyng3bck1xmyi8eveb8j8&st=6sn3nqzf&dl&raw=1'
  ];
  const handleChangeBackground = ()=> {
     setVideoIndex((prevIndex) => {
      const newIndex = prevIndex < videoArray.length - 1 ? prevIndex + 1 : 0;
      return newIndex;
    });
  }
 

  // Next Song Event handler
  const handleNextSong = () => {
    if (musicIndex >= MusicAPI.length - 1) {
      let setNumber = 0;
      setMusicsIndex(setNumber);
      updatecurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex + 1;
      setMusicsIndex(setNumber);
      updatecurrentMusicDetails(setNumber);
    }
  }

  // Next Song Event handler
  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = MusicAPI.length - 1;
      setMusicsIndex(setNumber);
      updatecurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicsIndex(setNumber);
      updatecurrentMusicDetails(setNumber);
    }
  }

  const updatecurrentMusicDetails = (number: number) => {
    let musicObject = MusicAPI[number];
    if (currentAudio.current) {
      currentAudio.current.src = musicObject.songSrc
      currentAudio.current.play().catch(error => console.error(error));
    }
    setCurrentMusicObject(musicObject);
    setIsAudioPlay(true);

  }


  // Audio progress Event Handler ===========================================
  const handleAudioProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    setAudioProgress(value);
    if (currentAudio.current) {
      currentAudio.current.currentTime = value * currentAudio.current.duration / 100;

    }
  }


  // Avatar Event Handler ==================================================
  let avatarOjectFit = ['object-cover', 'object-contain', 'none'];
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarOjectFit.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  }


  // Audio Play Event handler ==============================================
  const handleAudioPlay = () => {
    if (currentAudio.current) {
      if (currentAudio.current.paused) {
        currentAudio.current.play();
        setIsAudioPlay(true);
      } else {
        currentAudio.current.pause();
        setIsAudioPlay(false);
      }
    }
  }

  // Audio Update
  const handleAudioUpdate = () => {
    // Input total length of audio
    if (currentAudio.current) {
      let minutes = Math.floor(currentAudio.current.duration / 60);
      let seconds = Math.floor(currentAudio.current.duration % 60);
      let musicTotalLength = `
        ${isNaN(minutes) ? '00' : (minutes < 10 ? `0${minutes}` : minutes)} :
        ${isNaN(seconds) ? '00' : (seconds < 10 ? `0${seconds}` : seconds)}
      `;
      setMusicTotalLength(musicTotalLength);

      // Input current  time
      let currentMinutes = Math.floor(currentAudio.current.currentTime / 60);
      let currentSeconds = Math.floor(currentAudio.current.currentTime % 60);
      let musicCurrentTime = `
        ${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} : 
        ${currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      `;
      setMusicCurrentTime(musicCurrentTime);


      // Progress
      const progress = (currentAudio.current.currentTime / currentAudio.current.duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress)
    }

  }


  // Return
  return (
    <>
      {/* Container */}
      <div className=" w-full h-screen flex  justify-center items-center text-white">

        {/* Audio */}
        <audio
          src={Nair}
          ref={currentAudio}
          onEnded={handleNextSong}
          onTimeUpdate={handleAudioUpdate}
        ></audio>

        {/* background video */}
        <video
          key={videoArray[videoIndex]}
          className='absolute top-0 right-0 h-screen w-full object-cover -z-10 saturate-200'
          autoPlay
          muted
          loop
        >
          <source src={videoArray[videoIndex]} type="video/mp4"/>
        </video>

        {/* Balck screen */}
        <div className='w-screen h-screen absolute pointer-events-none bg-black/30 right-0' ></div>

        {/* Music container */}
        <div className='w-[19.9rem] sm:w-96 flex flex-col py-14 px-10 items-center justify-center text-center rounded-3xl shadow-box backdrop-blur-lg text-sm font-medium'>
          <p className='m-0 mb-2 text-zinc-300'>Music Player</p>
          <p className='text-xl'>{currentMusicObject.songName}</p>
          <p className='text-zinc-200 text-base my-1 font-normal'> {currentMusicObject.songArtist} </p>

          {/* Song Avatar */}
          <img
            className={`w-40 h-40 my-4 rounded-full  animate-move ${avatarOjectFit[avatarClassIndex]}`}
            onClick={handleAvatar}
            src={currentMusicObject.songAvatar}
            alt="Song Avatar"
          />

          {/* Music timer */}
          <div className='flex justify-between w-full font-medium'>
            <p> {musicCurrentTime} </p>
            <p> {musicTotalLength} </p>
          </div>
          {/* Music Progress bar */}
          <input
            type="range"
            value={audioProgress}
            onChange={handleAudioProgress}
            className='w-full mb-4 outline-none hue-rotate-15'
          />

          {/* Music controller */}
          <PlayControl
            onClick={handleAudioPlay}
            isAudioPlay={isAudioPlay}
            allMusics={MusicAPI}
            handleNextSong={handleNextSong}
            handlePrevSong={handlePrevSong}
          />

        </div>

        <div 
          className='w-36 h-5 bg-white absolute bottom-0 left-1/2 -translate-x-1/2 z-20 duration-300 cursor-pointer pt-4 rounded-t-md text-sm text-center hover:h-10 hover: text-black font-medium '
          onClick={handleChangeBackground}
        >
          Change Background
        </div>
      </div>
    </>
  )
}



let MusicAPI = [
  {
    id: 1,
    songName: 'Eu vou orar',
    songArtist: 'Nair Nany',
    songSrc: Nair,
    songAvatar: 'https://i.imgur.com/9hs8YRc.jpg'
  },
  {
    id: 2,
    songName: 'Eyano',
    songArtist: 'Sandra Mbuyi',
    songSrc: eyano,
    songAvatar: 'https://i.imgur.com/nmccSuW.jpg'
  },
  {
    id: 3,
    songName: 'Wonder',
    songArtist: 'Mercy Chinwo',
    songSrc: wonder,
    songAvatar: 'https://i.imgur.com/K0BPyWp.jpg'
  },
  {
    id: 4,
    songName: 'Acess Love',
    songArtist: 'Mercy Chinwo',
    songSrc: acessLove,
    songAvatar: 'https://i.imgur.com/76UlUVf.jpg'
  },
  {
    id: 5,
    songName: 'Oke Mmiri',
    songArtist: 'Mercy Chinwo',
    songSrc: oke,
    songAvatar: 'https://i.imgur.com/PY630AM.jpg'
  },
];
