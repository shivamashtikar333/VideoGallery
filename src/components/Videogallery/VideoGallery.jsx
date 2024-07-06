import React,{useState,useEffect,useRef} from 'react'
import videos from './videos'
import ReactPlayer from 'react-player';
import './VideoGallery.css'

const VideoGallery = () => {

  const galleryRef = useRef(null);
  const [items,setItems] = useState([]);

  useEffect(()=>{
    const generateItems = () =>{
      const rows = [
        {id:1, count:4},
        {id:2, count:3},
        {id:3, count:4},
      ];

      const newItems = rows.map((row)=>{
        return Array.from({length:row.count}, (_, index)=>{
          const itemId = `${row.id}-${index}`;
          const video = videos.find((v)=> v.id === itemId);
          return{
            id:itemId,
            rowId: row.id,
            video : video,
          }
        })
      })

      setItems(newItems)
    };

    generateItems();

    const handleMouseMove  = (e) =>{
        const {clientX, clientY, currentTarget} = e;
        const {width,height} = currentTarget.getBoundingClientRect();
        const centerX = width/2;
        const centerY = height/2;

        const sensitivity = 1;
        const deltaX = (centerX - clientX)/ sensitivity;
        const deltaY = (centerY - clientY)/ sensitivity;

        galleryRef.current.style.transform =`translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`

    }

    const container = document.querySelector(".container");
    container.addEventListener("mousemove", handleMouseMove);

    return ()=>{
        container.removeEventListener("mousemove", handleMouseMove);
    }

 },[])

  return (
    <div className='container'>
    <div className="gallery" ref={galleryRef}>
      {items.map((row,rowIndex)=>(
        <div key={`row-${rowIndex}`} className='row'>
          {row.map((item)=>(
            <div key={item.id} className='item'>
              <div className="preview-img">
                <img src={item.video.previewImg} alt={item.video.videoName} />
              </div>
              <p id='videoName'>{item.video.videoName}</p>
              <div className="video-wrapper">
                {
                  item.video && (
                    <>
                      <ReactPlayer
                        url={`${item.video.videoId}`}
                        controls = {false}
                        autoPlay = {true}
                        playing
                        loop
                        muted
                        width="100%"
                        height="100%"
                      />

                      
                    </>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </div>
  )
}

export default VideoGallery