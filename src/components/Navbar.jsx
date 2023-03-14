import { Stack, Box, Paper, IconButton } from '@mui/material';
import React from "react";
import { Search } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Logo } from  '../utils/constants';
import zIndex from '@mui/material/styles/zIndex';

const searchButtonStyle = {
    p:'7px 18px',
    borderRadius: "0 1.3em 1.3em 0",
    border: '1px solid var(--border-highlight-color)',
    backgroundColor:'var(--highlight-color)',
    color:'var(--font-color-sec)',
    // color:'#bbbbbb',
    "&:hover": {
        backgroundColor:'var(--highlight-color-hover)',
    }
};

const hoverCircleStyle = {
        // color:'#bbbbbb',
        color:'var(--font-color-sec)',
        "&:hover": {
            backgroundColor: 'var(--nav-btn-hover)',
        }
}


const Navbar = ({toggleSideBar, setToggleSideBar}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    const handleSideBarToggle = () => {
        setToggleSideBar(!toggleSideBar)
    }
    return (
        <Stack
            direction='row'
            alignItems='center'
            p='0.5vw 2vw 1vw 1vw'
            sx={{ position:'sticky', background:'var(--bg-color)', top:0, justifyContent:'space-between', zIndex:'2'}}
        >
            <Box sx={{
                display:'flex',
                gap:'1.4vw',
                alignItems:'center',
            }}>
                <IconButton sx={hoverCircleStyle} onClick={handleSideBarToggle}>
                    <MenuIcon sx={{height:'100%', width:'1.7vw', color:'var(--font-color-sec)'}}/>
                </IconButton>

                <Link to='/'>
                    <Logo/>
                </Link>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                <Paper
                    component='form'
                    id='search_query'
                    onSubmit={(event) => {
                        event.preventDefault()
                        if(searchTerm !== '')
                        {
                            navigate(`/results?search_query=${searchTerm}`);
                            setSearchTerm('');
                        }


                    }}
                    sx={{
                        borderRadius: "1.3em 0 0 1.3em",
                        border: '1px solid var(--border-highlight-color)',
                        pb:'1%',
                        pl: 2,
                        boxShadow: 'none',
                        backgroundColor:'transparent',
                        "&:hover": {
                            border: '1px solid #1c62b9'
                        }
                    }}
                    >
                    <input
                        className='search-bar'
                        placeholder='Search'
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)  
                        }}
                        />
                
                {/* type button prevents default action of submitting from (and refreshing the page) */}
                <IconButton type='button' 
                    sx={hoverCircleStyle}
                    onClick={()=>{
                        setSearchTerm('')
                    }}
                >
                <ClearIcon />
                </IconButton>
                </Paper>

                <IconButton type='submit' 
                    form='search_query'
                    sx={searchButtonStyle}
                >
                    <Search />
                </IconButton>
            </Box>

            <IconButton type='button' sx={[hoverCircleStyle,{color:'var(--toggle-btn-color)', backgroundColor: 'var(--toggle-btn-bg)'}]}
                onClick={()=>{
                        var root = document.body
                        // var root = document.getElementById('root')
                        var theme = (root.getAttribute('theme') == 'dark') ? 'light' : 'dark'

                        root.setAttribute('theme',theme)
                        localStorage.setItem('theme',theme)
                        }}>
                    <DarkModeIcon fontSize='large'/>
            </IconButton>
        </Stack>
    );
}

export default Navbar;