import { Link } from "react-router-dom";
import { debounce, Typography} from '@mui/material';
import he from 'he'; //for converting html entity to ascii
import ReactTimeAgo from 'react-time-ago'; // time publish

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";
import ReactPlayer from "react-player";
import { useState, useRef } from "react";

const VideoCard = ({data, url, alignVideo}) => {
    const [ onVideo, setOnVideo ] = useState(true);
    const [ videoGlimpse, setVideoGlimpse ] = useState();

    const onVideoRef = useRef(onVideo)
    onVideoRef.current = onVideo

    const startVideo = () => {
        setOnVideo(true)
        setTimeout(()=>{
            if (onVideoRef.current){
                setVideoGlimpse(true)
            }
        },1500)
    }

    const  stopVideo = () => {
        setOnVideo(false)
        setVideoGlimpse(false)
    }

    if (alignVideo == 'search')
    {
        return(
            <div
                style={{display:'flex',
                    flexDirection:'row',
                    fontFamily:'sans-serif',
                    gap:'1vw'
                }}
                
                onMouseEnter={startVideo}
                onMouseLeave={stopVideo}
            >

                <div>
                    <div style={{height:'13vw', width:'24vw', borderRadius:'0.7em', overflow:'hidden'}}>
                        {
                            (videoGlimpse === true)
                                ? (<ReactPlayer url={`https://www.youtube.com/watch?v=${url}`} playing={videoGlimpse} volume={0} height='100%' width='100%' controls={false} />)
                                : (<img src={data.thumbnails.medium.url} style={{height:'100%', width: '100%'}}/>)
                        }
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft :'0.5vw'
                }}>
                    <p style={{
                        color:'var(--font-color-main)',
                        fontSize:'1em',
                        lineHeight:'1.5rem',
                        fontWeight:'550',
                        overflow:'hidden',
                        display:'-webkit-box',
                        WebkitBoxOrient:'vertical',
                        WebkitLineClamp:'2',
                        textOverflow:'ellipsis',
                        margin: '0'
                    }}>
                        {he.decode(data.title)}
                    </p>

                    <p style={{
                        margin:'0.1em 0 1.2em 0',
                        color:'var(--font-color-sec)',
                        fontSize:'0.9rem',
                        fontWeight:'500',
                    }}>
                        <ReactTimeAgo date={Date.parse(data.publishTime)} locale='en-US'/>
                    </p>

                    <Link to={`/channel/${data.channelId}`}>
                        <Typography variant='p' sx={{
                                color:'var(--font-color-sec)',
                                fontSize:'0.9rem',
                                fontWeight:'500',
                                '&:hover':{
                                    color:'var(--font-color-sec-hover)'
                        }}}>
                            {he.decode(data.channelTitle)}
                        </Typography>
                    </Link>
                
                    <Typography variant='p' sx={{
                        color:'var(--font-color-sec)', 
                        fontSize:'0.9em',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        marginTop:'2em'
                    }}>
                        {he.decode(data.description)}
                    </Typography>
            </div>
        </div>
        )
    }

    else if (alignVideo == 'main')
    {

        return (
            <div
                style={{
                    display:'flex',
                    flexDirection: 'column',
                    fontFamily:'Roboto,Arial,sans-serif',
            }}

                onMouseEnter={()=>
                {
                    // setOnVideo(true)
                    // console.log('over',onVideo)
                    // setTimeout(()=>{
                    //     console.log('inside', onVideo)
                    //     if (onVideo){
                    //         setVideoGlimpse(true)
                    //     }
                    // },1000)
                    setVideoGlimpse(true)

                }}

                onMouseLeave={()=>{
                    // setOnVideo(false)
                    // console.log('leave',onVideo)
                    setVideoGlimpse(false)
                }}
            >
                <div>
                    <div style={{height:'13vw', borderRadius:'0.7em', overflow:'hidden'}}>
                        {
                            (videoGlimpse === true)
                                ? (<ReactPlayer url={`https://www.youtube.com/watch?v=${url}`} style={{"pointerEvents":'none'}} config={{ youtube: { playerVars: { disablekb: 1 } } }} playing={videoGlimpse} volume={0} height='100%' width='100%' controls={false} />)
                                : (<img src={data.thumbnails.medium.url} style={{height:'13vw', width: '100%'}}/>)   
                                        // {/* <img src={data.thumbnails.medium.url} style={{borderRadius:'0.7em', height:'13vw', width: '100%'}}/> */}
                        }
                    </div>
                </div>

                <div style={{
                    display: 'unset',
                    flexDirection: 'unset',
                    gap: 'unset',
                    marginLeft :'0.5vw'
                }}>
                    <p style={{
                        color:'var(--font-color-main)',
                        fontSize:'1em',
                        lineHeight:'1.5rem',
                        fontWeight:'550',
                        overflow:'hidden',
                        display:'-webkit-box',
                        WebkitBoxOrient:'vertical',
                        WebkitLineClamp:'2',
                        textOverflow:'ellipsis',
                        marginTop: '0.7vw'                
                    }}>
                        {he.decode(data.title)}
                    </p>

                    <Link to={`/channel/${data.channelId}`}>
                        <Typography variant='p' 
                            sx={{
                                color:'var(--font-color-sec)',
                                fontSize:'0.9rem',
                                fontWeight:'500',
                                '&:hover':{
                                    color:'var(--font-color-sec-hover)'
                                }}}>
                            {he.decode(data.channelTitle)}
                        </Typography>
                    </Link>

                    <p 
                        style={{margin:'0',
                            marginTop:'0.4em',
                            color:'var(--font-color-sec)',
                            fontSize:'0.9rem',
                            fontWeight:'500',
                            }}>
                        <ReactTimeAgo date={Date.parse(data.publishTime)} locale='en-US'/>
                    </p>

                </div>
            </div>
        )

        
    }
    ;
}

export default VideoCard;