import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://youtube-v31.p.rapidapi.com',
  params: {
    // part: 'snippet,id',
    regionCode: 'IN',
    maxResults: '50',
    order: 'viewCount'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_RAPID_API,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromApi = async (url) => {
    const { data } = await axios.get(`https://youtube-v31.p.rapidapi.com/${url}`,options).then()
      .catch((e) => {
        if (e.response.status == 429) //API request limit exceeded. Need to use backup key
            console.log('API limit exceeded')
      });
    
    return data
}
