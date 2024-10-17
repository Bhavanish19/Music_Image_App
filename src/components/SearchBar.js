import React, { useCallback } from 'react';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaPlay, FaPause } from 'react-icons/fa';
import { debounce } from 'lodash';

// SearchBar component handles the search input, search button, and play/pause button
const SearchBar = ({ searchInput, setSearchInput, handleSearch, handleKeyDown, isPlaying, playAudio }) => {
  const debouncedSetSearchInput = useCallback(
    debounce((value) => {
      setSearchInput(value);
    }, 100), // Adjust delay as needed
    []
  );

  const handleInputChange = (e) => {
    debouncedSetSearchInput(e.target.value);
  };

  return (
    <Container className="search-bar-container">
      <InputGroup className="search-bar-input-group">
        <FormControl
          placeholder="Search for music..."
          type="input"
          className="search-bar-input"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={searchInput}
        />
        <Button className="search-bar-button" onClick={handleSearch}>
          Search
        </Button>
        <Button className="toggle-audio-button" onClick={playAudio}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
      </InputGroup>
    </Container>
  );
};

export default SearchBar;