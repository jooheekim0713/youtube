import { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App() {
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [videos, setVideos] = useState([]);
  const onSearch = (query) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=25&type=video&key=${API_KEY}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        result.items.map((item) => ({ ...item, id: item.id.videoId }))
      )
      .then((items) => setVideos(items))
      .catch((error) => console.log('error', error));
  };
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAgTgdif8AmrvhYsYXZ9_j2BReA_fI44Uk',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={onSearch} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
