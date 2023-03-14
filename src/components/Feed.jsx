import { useState, useEffect } from "react";
import React from "react";
import { Box } from '@mui/material';
import { fetchFromApi } from '../utils/fetchApi';
import { Videos, Loading, SideBar } from '.';


const Feed = ({selectedCategory, sideBar, setShowSideBar, setToggleSideBar}) => {
    document.title = 'YouTube'
    // const [ selectedCategory, setSelectedCategory ] = useState({title:'New',icon:false});
    const [ videos, setVideos] = useState([]);


    useEffect(() => {
        setToggleSideBar(true)
        setShowSideBar(true)
        // setVideos(null);
        fetchFromApi(`search?part=snippet&q=${selectedCategory.title}`).then((data) => {
            setVideos(data.items)
            // {console.log(data.items[1])}
        })
    }, [selectedCategory]);
    
    return (
        <div style={{width:'100%', height:'100%'}}>
        {
            videos?.length > 0
            ? (
                <Box sx={{
                    display:'flex',
                    flexDirection:'row'
                }}>

                    <Box sx={{margin:"0 5vw"}}>
                        <p style={{
                            display: sideBar ? 'block' : 'none',
                            color: 'var(--font-color-main)',
                            fontSize: '1.8vw',
                            marginTop: '1vw',
                        }}>{selectedCategory.icon} {selectedCategory.title}</p>
                        {/* {selectedCategory.icon ? console.log(selectedCategory.icon,'bb') : console.log(selectedCategory.icon,'abc')} {selectedCategory.title}</p> */}
                        <Videos videos={videos} alignVideo='main' sideBar={sideBar} />
                    </Box>
                </Box>
            )
            : (<Loading />)
        }
        </div>
    );
}

export default Feed;