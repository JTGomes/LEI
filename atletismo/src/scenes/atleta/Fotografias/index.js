import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './Photos.css';

const urls = [
  {
    original: 'http://cdn-r1.unilad.co.uk/wp-content/uploads/2016/08/boltpose.jpg',
    thumbnail: 'http://cdn-r1.unilad.co.uk/wp-content/uploads/2016/08/boltpose.jpg'
  },
  {
    original: 'https://d.ibtimes.co.uk/en/full/1542589/usain-bolt.jpg',
    thumbnail: 'https://d.ibtimes.co.uk/en/full/1542589/usain-bolt.jpg'
  }
];

class Photos extends React.Component {

  render() {
    return (
      <div className="gallery">
        <ImageGallery items={urls}/>
      </div>
    )
  }
}

export default Photos;
