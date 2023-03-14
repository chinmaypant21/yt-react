import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchFromApi } from "../utils/fetchApi";
import { Loading } from '.';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactTimeAgo from "react-time-ago";

import Modal from '@mui/material/Modal';
import ReplyIcon from '@mui/icons-material/Reply';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const VideoDetail = ({sideBar, setShowSideBar, setToggleSideBar}) => {
    const { id } = useParams()
    const [ videoDetails, setVideoDetails ] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    useEffect(() => {
        setToggleSideBar(false);
        setShowSideBar(false);
        setVideoDetails(null);
        fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
                setVideoDetails(data.items)
            })
        },[id])
        
        if (videoDetails?.length > 0)
            document.title = `${videoDetails[0].snippet.title} - YouTube`
        
        return (
            videoDetails?.length > 0
            ? (
                <div style={{
                    margin:'1% 2%',
                    display:'flex',
                    flexDirection:'column',
                    width:'100%',
                    // opacity: sideBar ? 'var(--toggle-opacity)' : '1' 
                    // WebkitMaskImage: sideBar ? 'linear-gradient(45deg, #00000085, #ffffff85)' : 'none' 
                    filter: sideBar ? 'brightness(0.5)' : 'brightness(1)'
                }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} playing={true} className="react-player" controls={true} />

            <div style={{
                display:'flex',
                flexDirection:'row',
                marginTop:"1em",
                columnGap:'20px',
            }}>                
                <div >
                    <p className="video-detail-title">{videoDetails[0].snippet.title}</p>
                    <p style={{margin:'0'}}>{Intl.NumberFormat('en').format(Number(videoDetails[0].statistics.viewCount))}</p>
                    <Link to={`/channel/${videoDetails[0].snippet.channelId}`}>
                        <p className="video-detail-channel">{videoDetails[0].snippet.channelTitle}</p>                
                    </Link> 
                                
                    {/* <div> */}
                    {/* </div> */}
                </div>

                <div className="video-detail-btn">
                    <ThumbUpAltIcon />
                    <span style={{color:'#737373', fontSize:'150%'}}>|</span>
                    <p style={{margin:'0'}}>{Intl.NumberFormat('en').format(Number(videoDetails[0].statistics.likeCount))}</p>
                    {/*  {notation: "compact"}, to convert to K, M, B */}
                </div>
                {/* Executing handleClose directly without wrapping inside a function or
                    setting state directly will create an infinite loop of re-rendering as state 
                    will change continuously without even trigger of
                    the clicks or close  */}
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'var(--bg-color)',
                        borderRadius: '0.8em',
                        border: 'none',
                        color:'var(--font-color-main)',
                        boxShadow: 24,
                        padding: "0.6em",
                        width: '26%',
                        fontSize:'1.1vw',
                        overflow:'hidden'
                    }}>

                        <Typography sx={{textAlign: 'center' }}>
                            Share link
                        </Typography>
                        <Box sx={{backgroundColor:'var(--border-highlight-color)',
                                margin:"5% 1em", padding:"4% 4%",
                                borderRadius:'1em', border: '1px solid #565656',
                                display:'flex', flexDirection:'row',
                                gap:'1em',
                                 }}
                                onClick={(e) => {
                                    navigator.clipboard.writeText(window.location.href)
                                    e.currentTarget.style.borderColor='#e5ffc75e'
                                    e.currentTarget.style.backgroundColor='#36813a26'
                                }}>
                                <div>
                                    <ContentCopyIcon sx={{width:'1.8vw',height:'1.5vw'}}/>
                                </div>
                                <div style={{overflow:'hidden', textOverflow:'ellipsis'}}>
                                    <p style={{margin:0, textAlign:'center' }}>{window.location.href}</p>
                                </div>
                        </Box>
                    </Box>
                </Modal>

                <div className="video-detail-btn"
                    // Executing handleOpen directly without wrapping inside a function or
                    // setting state directly will create an infinite loop of re-rendering 
                    // as state will change continuously without even trigger of
                    // the clicks or close 
                    onClick={()=>{handleOpen()}}>
                        <ReplyIcon />
                        Share
                </div>
            </div>

        </div>
        ) 
        : <Loading />
    );
}

export default VideoDetail;