import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import { useSpotify } from './hooks/useSpotify';
import { useUnsplash } from './hooks/useUnsplash';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [allImgs, setAllImgs] = useState([]);
  const { playAudio, handleSearch, isPlaying, error: spotifyError } = useSpotify(searchInput);
  const { imgs, totalPages, error: unsplashError } = useUnsplash(searchInput, page);

  const handleSearchClick = () => {
    handleSearch();
    setPage(1); 
    setAllImgs([]); // Clear previous search results
  };

  const loadMoreImages = async () => {
    if (page <= totalPages) {
      // Simulate fetching more images on scroll
      setAllImgs([...allImgs, ...imgs]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="App">
      <h1 className="app-title">Music Search App</h1>
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearchClick}
        handleKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        isPlaying={isPlaying}
        playAudio={playAudio}
      />
      {spotifyError && <Alert variant="danger">{spotifyError}</Alert>}
      {unsplashError && <Alert variant="danger">{unsplashError}</Alert>}
      
      {/* Infinite Scroll for Images */}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreImages}
        hasMore={page < totalPages}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <ImageGallery imgs={allImgs} />
      </InfiniteScroll>
    </div>
  );
}

export default App;

