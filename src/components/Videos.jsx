import React from "react";
import { Link } from "react-router-dom";
import { VideoCard, Loading } from '.';

const Videos = ({ videos, alignVideo, sideBar}) => {
    let styleProp = {}
    if(alignVideo==='search')
    {
        styleProp = {
            display:'grid',
            gridTemplateColumns: 'repeat(1,1fr)',
            rowGap:'1em',
            // margin: "0 15%",
            marginTop:'2.5%',
            paddingTop:'2%',
            paddingBottom:'2%',
            
            borderTop: '1px solid var(--border-highlight-color)'
        }
    }

    else if(alignVideo==='main')
    {
        styleProp = {
            display:'grid',
            gridTemplateColumns: sideBar ? 'repeat(3,1fr)' : 'repeat(4,1fr)',
            padding: sideBar ? '2vw 1vw 2vw 1vw' : '2vw 0 3vw 0',
            rowGap:'1.3em',
            columnGap:'1.2%',
            marginTop:'1.5%',

            borderTop: sideBar ? "1px solid var(--border-highlight-color)" : 'none'
        }
    }
    return (
                <div style={styleProp}>
                        {videos.map((item,idx) => (
                            <Link to={`/watch/${item.id.videoId}`}>
                                <VideoCard data={item.snippet} url={item.id.videoId} alignVideo={alignVideo} key={idx}/>
                            </Link>
                        ))}

                </div>
    );
}

export default Videos