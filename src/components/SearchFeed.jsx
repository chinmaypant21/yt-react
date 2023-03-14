import React, { useState, useEffect } from "react";
import { fetchFromApi } from "../utils/fetchApi";
import { useLocation } from "react-router-dom";
import { Videos, ChannelDetail, Loading, SideBar } from ".";


const SearchFeed = ({sideBar, setShowSideBar, setToggleSideBar}) => {
    const location = useLocation()
    const searchQuery = new URLSearchParams(location.search).get('search_query')
    document.title = `${searchQuery} - YouTube`
    const [ videos, setVideos ] = useState([])
    // const [ selectedCategory, setSelectedCategory ] = useState('New');


    useEffect(() => {
      setToggleSideBar(true)
      setShowSideBar(true)
      setVideos(null) // to trigger the Loader when new data is fetching
      if (searchQuery !== null) {
      fetchFromApi(`search?part=snippet&q=${searchQuery}`)
        .then((data) => setVideos(data.items))
      }
    }, [searchQuery]);

    return (
        (videos?.length > 0)
        ? (
              <div style={{display:'flex', flexDirection:'row', width: '100%',
                    padding: sideBar ? '0 6vw' : '0 0 0 12vw'}}>
                <Videos videos={videos} alignVideo='search'/>
              </div>
          )
        : <Loading />
    );
}

export default SearchFeed;