import React from 'react'
import List from './List'
import Lightbox from 'react-images'
import bindFunctions from './utils/bindFunctions'
import { css, StyleSheet } from 'aphrodite'
import cookie from 'react-cookie'
import * as actionsF from '../store/Profile/actionsProfile'
import DropzoneComponent from 'react-dropzone-component'
import FontAwesome from 'react-fontawesome'
class Pictures extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: false,
      lightboxIsOpen: false,
      currentImage: 0,
      upload: false,
      images: this.props.images,
    }

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],

      showFiletypeIcon: true,
      postUrl: '/ftp/add-file',
    }

    this.djsConfig = {
      acceptedFiles: "image/*",
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 10,
      maxFiles: 10,
      addRemoveLinks: true,
    };

    this.dropzone = null;
    this.eventHandlers = {
      init: dz => this.dropzone = dz,
      successmultiple: this.completeFile.bind(this),
    }
    this.UploadZone = this.UploadZone.bind(this)



    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.choose = this.choose.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.gotoImage = this.gotoImage.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.ondelete = this.ondelete.bind(this)

    this.load = this.load.bind(this)
    this.user = cookie.load('userId')
  }

  load = (src, name) => {
    this.setState({
      currentImage: src,
      name: name,
    })
  }

  openLightbox(index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    })
  }

  choose(index) {
    var choosePic = this.props.images[index]
    this.props.choose(choosePic.src)
  }

  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return

    this.gotoNext()
  }
  ondelete = (file,index) => {
    console.log('onDelete',file);
    const { dispatch } = this.props
    dispatch(actionsF.removeFile('pictures',`${file}`,index))
  }
  renderRowsGallery() {
    const { images } = this.props
    const { rowsValue } = this.props

    if (!images) return
    let rows = []
    const rowsGallery = images.filter(i => true).map((obj, i) => {
      rows.push(i)

      if (rows.length > rowsValue - 1 || i > images.length - rowsValue + 1) {
        let rowD = rows
        rows = []
        return (
          <div key={i} className={css(classes.rowGallery) + ' profilePicture'}>
            {rowD.map((ob, j) => (
              <div
                href={images[ob].src}
                className={css(classes.thumbnail, classes['rowSquare'])}
                key={j}

              >
                <img onClick={e => this.openLightbox(ob, e)} src={images[ob].src} className={css(classes.rowSource)} />
                <span onClick={() => this.ondelete(images[ob].name,ob)} className={css(classes.delete) + ' deleteBtn'}><FontAwesome
                    className="super-crazy-colors"
                    name="trash"
                    size="lg"
                /></span>
              </div>

            ))}
          </div>
        )
      }
    })

    return (
      <div className={css(classes.rowsGallery) + ' profilePicture'}>
        {rowsGallery}
      </div>
    )
  }

  renderGallery() {
    const { images } = this.props

    if (!images) return

    const gallery = images.filter(i => true).map((obj, i) => {
      return (
        <a
          href={obj.src}
          className={css(classes.thumbnail, classes['square'])}
          key={i}
          onClick={e => this.openLightbox(i, e)}
        >
          <img align="middle" src={obj.src} className={css(classes.source)} />
        </a>
      )
    })

    return (
      <div className={css(classes.gallery) + ' profilePicture'}>{gallery}</div>
    )
  }
  UploadZone(){
    console.log('up',this.state.upload)
    this.setState({
      upload: !this.state.upload
    });
  }

  handlePost() {
    this.dropzone.processQueue();
  }
  completeFile(file) {
    const {dispatch} = this.props;
    console.log(file);
    this.setState({
      upload: !this.state.upload
    });
    dispatch(actionsF.getFiles('get-pictures'))
  }

  render() {
    const { rowsValue } = this.props
    if (rowsValue) {
      var pictures = this.renderRowsGallery()
    } else {
      var pictures = this.renderGallery()
    }
    if (this.props.images) {
      return (
        <div>
          <button onClick={this.UploadZone} className="btn btnZone">
            <span className="up">Upload</span>
            <FontAwesome
                className="super-crazy-colors"
                name="upload"
                size="lg"
            />
          </button>
          {this.state.upload && (
              <div className="dropZoneCont">
                <DropzoneComponent  eventHandlers={this.eventHandlers}
                                    djsConfig={this.djsConfig}
                                    config={this.componentConfig}
                />
                <button className="btnUp btn" onClick={this.handlePost.bind(this)}>Upload</button>
              </div>
          )}
          {pictures}
          <Lightbox
            images={this.props.images}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onChoose={this.user && this.choose}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
            showThumbnails={true}
            spinner={this.props.spinner}
            spinnerColor={this.props.spinnerColor}
            spinnerSize={this.props.spinnerSize}
            theme={this.props.theme}
          />

          {this.state.currentImage ? (
            <div>
              <b>Current Picture:</b>

              <img src={this.state.currentImage} alt="" />
              <span>this.state.name</span>
            </div>
          ) : (
            ''
          )}
        </div>
      )
    } else {
      return false
    }
  }
}

Pictures.displayName = 'Gallery'

const gutter = {
  small: 2,
  large: 4,
}
const classes = StyleSheet.create({
  gallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '160px',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    },
  },
  delete: {
    bottom: 0,
    padding: '8px',
    lineHeight: 'auto',
    top: 'auto',
    right: 0
  },
  rowGallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    height: '250px',
    flexWrap: 'wrap',
    justifyContent: 'center',

    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    },
  },
  rowSquare: {
    paddingBottom: 0,
    position: 'relative',
    width: 'calc(33% - 20px)',
    border: '4px solid #d1d1d1',
    margin: '10px',
    '@media (min-width: 500px)': {
      paddingBottom: 0,
    },
  },
  rowSource: {
    border: 0,
    display: 'block',
    height: 'auto',
    cursor: 'pointer',
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    minHeight: '250px',
  },
  // anchor
  thumbnail: {
    boxSizing: 'border-box',
    display: 'flex',
    float: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 0,

    paddingBottom: gutter.small,
    overflow: 'hidden',

    '@media (min-width: 500px)': {
      paddingBottom: gutter.large,
    },
  },

  // orientation
  landscape: {
    width: '30%',
  },
  square: {
    paddingBottom: 0,
    width: 'calc(50% - 10px)',
    margin: '5px',
    '@media (min-width: 500px)': {
      paddingBottom: 0,
    },
  },

  // actual <img />
  source: {
    border: 0,
    display: 'block',
    height: 'auto',
    cursor: 'pointer',
    margin: '0 auto',
    maxWidth: '100%',
    width: '100%',
    minHeight: '160px',
  },
})

export default Pictures
