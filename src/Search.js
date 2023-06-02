import React from 'react';
import axios from 'axios';
import { Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
// import Artist from './Artist.js'
// import Playlist from './Playlist.js'
import SongCard from './SongCard.js'
import { withAuth0 } from '@auth0/auth0-react';
import JarJarImg from './JarJarBeats.png'


class Search extends React.Component {
  // render() {
  constructor(props) {
    super(props);
    this.state = {
      artistData: [],
      artistDataObj: {},
      artistDataArray: [],
      error: false,
      haveArtistData: false,
      artist: '',
      description: '',
      location: '',
      title: '',
      album: '',
      image: '',
      favorites: [],
      userPlaylist: undefined
    }
  }
  getPlaylist = async () => {
    // console.log('gettingPlaylist');
    try {
      if (this.props.auth0.isAuthenticated) {
        // console.log("is loggd in");
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/playlist?email=${this.props.auth0.user.email}`,
          headers: { "Authorization": `Bearer ${jwt}` }

        }
        // console.log(config);
        await axios(config)
          .then(res => this.setState({ userPlaylist: res.data }));
        // console.log(results.data);
      }
    } catch (err) {
      console.log("nay nay", err.response);
    }

  };


  getArtist = async () => {
    try {
      let artistUrl = `${process.env.REACT_APP_SERVER}/searchSongs?name=${this.state.artist}`;
      console.log('this is the artistUrl: ', artistUrl);
      let artistResponse = await axios.get(artistUrl);
      // console.log('this is the artistResponse: ', artistResponse);
      let artistData = artistResponse.data;
      this.setState({
        artistData: artistData,
        error: false,
        haveArtistData: true
      })
      console.log('this is the artistData: ', artistData);
      // console.log('this is the album: ', album);
      // console.log('this is the artistData: ', artistData);
    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An error Occured: ${error.response}`
      });
    }
  };

  postPlaylist = async (userFavorites) => {
    try {
      // add playlist to the database using a post request
      // once it is retrived from data base set it into state
      // let playlistURL = 

      //goes into postPlaylist
      // Create a new playlist if the user doesn't have one

      const createPlaylistConfig = {

        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/playlist?email=${this.props.auth0.user.email}`,
        // headers: { "Authorization": `Bearer ${jwt}` },
        data: userFavorites

      }


      let createdPlaylist = await axios(createPlaylistConfig);
      this.setState({
        userPlaylist: createdPlaylist.data
      });
      console.log(createdPlaylist.data);
    } catch (error) {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
    }
  }
  handleSearchSubmit = async (event) => {
    event.preventDefault();
    this.getArtist();
  }

  changeArtistInput = (event) => {
    this.setState({
      artist: event.target.value

    });
  };


  addFavorite = async (songData) => {
    // const { songs } = this.state.userPlaylist;
    // // const newFavorites = [...favorites, songCard];
    // // this.setState({ favorites });

    // songs.push(songData);
    let songToUpdate = {
      name: this.state.userPlaylist.name,
      title: this.state.userPlaylist.title,
      email: this.state.userPlaylist.email,
      _id: this.state.userPlaylist._id,
      __v: this.state.userPlaylist.__v,
      songs: [...this.state.userPlaylist.songs, songData]
    }

    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    const config = {
      method: 'put',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/playlist/${songToUpdate._id}`,
      headers: { "Authorization": `Bearer ${jwt}` },
      data: songToUpdate
    }
    const result = await axios(config);
    console.log('result', result);

    this.setState({
      userPlaylist: songToUpdate
    });
  };
  


  componentDidMount = async () => {
    if (this.props.auth0.isAuthenticated) {
      //check to see if user who is logged in has a playlist in the database
      // if they do have one get playlist will put it in state and return true
      await this.getPlaylist();

    }
  }
  handlePlaylistClick = (event) => {
    event.preventDefault();
    console.log('creating new playlist');
    let userPlaylist = {
      email: this.props.auth0.user.email,
      title: 'My Playlist',
      name: this.props.auth0.user.name,
      songs: []
    }
    this.postPlaylist(userPlaylist);
  }

  render() {

   // console.log(this.state.userPlaylist);

    // console.log(this.props.auth0.user);
    let songCards = [];
    console.log(this.state.artistData);
    if (this.state.artistData.length > 0) {
      songCards = this.state.artistData.map((artist, idx) => {
        // const ( title, album, && image ) = artist;
        // if (title && album && image) (
        // console.log(artist);
        return (
          <Col key={idx} className="mt-4">
            <SongCard
              key={idx}
              id={artist.id}
              artist={artist}
              title={artist.title}
              album={artist.album}
              image={artist.image}
              name={artist.name}
              addFavorite={this.addFavorite}

            />
          </Col>
        )
        // ) else (
        //     return null;
        // )
      });
    }
    return (
      <>
        <header>
          <img className='JarJar' src={JarJarImg} alt='JarJar' height='200px' />
          <div>

            <h1>Welcome to Jar Jar Beats!</h1>
            <p>Build your own personal playlist! Search your favorite artists! Choose your favorite songs!</p>
            <div className='formDiv'>

            <Form onSubmit={this.handleSearchSubmit}>
              <label>
                <input className='input' name="artist" onChange={this.changeArtistInput} />
              </label>
              <Button type="submit" className="button">Search</Button>
            </Form>
          <Button onClick={this.handlePlaylistClick} >Create Playlist!</Button>
          </div>
            </div>
        </header>
        <main>

          {this.state.error ? <p>{this.state.errorMessage}</p> :
            this.state.haveArtistData &&
            <div>
              {songCards}
            </div>
          }
        </main>
      </>
    );

  }
}

export default withAuth0(Search);
