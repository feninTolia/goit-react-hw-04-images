import { useState } from 'react';
import GalleryView from './GalleryView/GalleryView';
import Searchbar from './Searchbar/Searchbar';

const App = () => {
  // eslint-disable-next-line
  const [photosData, setPhotosData] = useState(null);
  const [query, setQuery] = useState('');

  const handleFormSubmit = newQuery => {
    setQuery(newQuery);
  };

  const handleModalData = newPhotosData => {
    setPhotosData(newPhotosData);
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={handleFormSubmit} />
      <GalleryView newQuery={query} handleModalData={handleModalData} />
    </div>
  );
};

export default App;
