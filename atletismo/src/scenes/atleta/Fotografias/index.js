import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ModalMedia from '../Resultados/components/modalMedia';
import './Photos.css';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class Photos extends React.Component {

  constructor() {
    super();
    this.state = {
      showIndex: false,
      lazyLoad: true,
      slideOnThumbnailHover: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: false,
      showGalleryFullscreenButton: true,
      showPlayButton: false,
      showGalleryPlayButton: true,
      showNav: true,
      slideDuration: 450,
      slideInterval: 2000,
      thumbnailPosition: 'bottom',
      showVideo: {},
      modalMedia: false,
    };
    //teste... a ser passado como props
    //thumbnails e vídeos do youtube têm sempre a mesma estrutura em termos de links
    this.images = [
      {
        thumbnail: `https://img.youtube.com/vi/rk4Pxa8LE44/0.jpg`,
        original: `https://img.youtube.com/vi/rk4Pxa8LE44/0.jpg`,
        embedUrl: 'https://www.youtube.com/embed/rk4Pxa8LE44?autoplay=1&showinfo=0',
        description: 'Recorde 2008',
        renderItem: this._renderVideo.bind(this)
      },
      {
        original: `http://www.konbini.com/wp-content/blogs.dir/13/files/2017/06/75c1b160-1ff5-4efc-8749-d167d480c19e.jpg`,
        thumbnail: `http://www.konbini.com/wp-content/blogs.dir/13/files/2017/06/75c1b160-1ff5-4efc-8749-d167d480c19e.jpg`,
      },
      {
        original: `http://topnaija.ng/wp-content/uploads/2017/11/usain-bolt.jpg`,
        thumbnail: `http://topnaija.ng/wp-content/uploads/2017/11/usain-bolt.jpg`,
        originalClass: 'featured-slide',
        thumbnailClass: 'featured-thumb',
        description: 'Usain Bolt, gotta love em!'
      },
    ];
    this.toggleM = this.toggleM.bind(this);
  }

  toggleM(){
    this.setState({
      modalMedia: !this.state.modalMedia,
    })
  }

  initModalMedia(){
    this.setState({
      modalMedia: true,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.slideInterval !== prevState.slideInterval ||
        this.state.slideDuration !== prevState.slideDuration) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
  }

  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({[state]: event.target.value});
  }

  _handleCheckboxChange(state, event) {
    this.setState({[state]: event.target.checked});
  }

  _handleThumbnailPositionChange(event) {
    this.setState({thumbnailPosition: event.target.value});
  }

  _resetVideo() {
    this.setState({showVideo: {}});

    if (this.state.showPlayButton) {
      this.setState({showGalleryPlayButton: true});
    }

    if (this.state.showFullscreenButton) {
      this.setState({showGalleryFullscreenButton: true});
    }
  }

  _toggleShowVideo(url) {
    // eslint-disable-next-line
    this.state.showVideo[url] = !Boolean(this.state.showVideo[url]);
    this.setState({
      showVideo: this.state.showVideo
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({showGalleryPlayButton: false});
      }

      if (this.state.showFullscreenButton) {
        this.setState({showGalleryFullscreenButton: false});
      }
    }
  }

  _renderVideo(item) {
    return (
      <div className='image-gallery-image'>
        {
          this.state.showVideo[item.embedUrl] ?
            <div className='video-wrapper'>
                <a
                  className='close-video'
                  onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
                >
                </a>
                <iframe
                  width='560'
                  height='315'
                  src={item.embedUrl}
                  frameBorder='0'
                  allowFullScreen
                >
                </iframe>
            </div>
          :
            <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
              <div className='play-button'></div>
              <img src={item.original} alt="ERRO!"/>
              {
                item.description &&
                  <span
                    className='image-gallery-description'
                    style={{right: '0', left: 'initial'}}
                  >
                    {item.description}
                  </span>
              }
            </a>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
      <section className='app'>
        <ImageGallery
          ref={i => this._imageGallery = i}
          items={this.images}
          lazyLoad={false}
          onClick={this._onImageClick.bind(this)}
          onImageLoad={this._onImageLoad}
          onSlide={this._onSlide.bind(this)}
          onPause={this._onPause.bind(this)}
          onScreenChange={this._onScreenChange.bind(this)}
          onPlay={this._onPlay.bind(this)}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showFullscreenButton={this.state.showFullscreenButton && this.state.showGalleryFullscreenButton}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          showThumbnails={this.state.showThumbnails}
          showIndex={this.state.showIndex}
          showNav={this.state.showNav}
          thumbnailPosition={this.state.thumbnailPosition}
          slideDuration={parseInt(this.state.slideDuration, 10)}
          slideInterval={parseInt(this.state.slideInterval, 10)}
          slideOnThumbnailHover={this.state.slideOnThumbnailHover}
          additionalClass="app-image-gallery"
        />
      </section>
        <p onClick={()=>this.initModalMedia()} style={{cursor:'pointer'}}>+&nbsp;Adicionar Fotografia/Vídeo</p>
        <ModalMedia modalMedia={this.state.modalMedia} toggle={this.toggleM} />
      </div>
    );
  }
}

export default Photos;
