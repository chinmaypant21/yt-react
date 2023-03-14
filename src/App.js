import React, {useState} from "react";
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Feed, ChannelDetail, VideoDetail, SearchFeed, Navbar, SideBar } from './components'
import './App.css';

const theme = localStorage.getItem('theme')
document.body.setAttribute('theme',theme)

const App = () => {
    const [ selectedCategory, setSelectedCategory ] = useState({title:'New',icon:false});
    const [ showSideBar, setShowSideBar] = useState(true) //to overlap the sidebar when video page is open
    const [ toggleSideBar, setToggleSideBar] = useState(true)
    return(
            <Box sx={{backgroundColor:'var(--bg-color)'}}>
                <Navbar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/>
                <Box sx={{display:'flex', flexDirection:'row'}}>
                        <div style={{display: toggleSideBar ? 'flex' : 'none'}}>
                            <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sideBar={toggleSideBar} showSideBar={showSideBar}/>
                        </div>
                    <Routes>
                        {/* <><Navbar/><Feed/></>} */}
                        <Route path="/" exact element={<Feed selectedCategory={selectedCategory} sideBar={toggleSideBar} setShowSideBar={setShowSideBar} setToggleSideBar={setToggleSideBar} />}/>
                        <Route path="/watch/:id" exact element={<VideoDetail sideBar={toggleSideBar} setShowSideBar={setShowSideBar} setToggleSideBar={setToggleSideBar}/>}/>
                        <Route path="/channel/:id" exact element={<ChannelDetail/>}/>
                        <Route path="/results" exact element={<SearchFeed sideBar={toggleSideBar} setShowSideBar={setShowSideBar} setToggleSideBar={setToggleSideBar}/>} />
                    </Routes>
                </Box>
            </Box>
    );
}

export default App