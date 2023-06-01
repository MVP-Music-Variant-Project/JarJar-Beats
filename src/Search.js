import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
// import Artist from './Artist.js'
// import Playlist from './Playlist.js'
import SongCard from './SongCard.js'
import { withAuth0 } from '@auth0/auth0-react';


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
    console.log('gettingPlaylist');
    let userPlaylist = false;
    try {
      if (this.props.auth0.isAuthenticated) {
        let email = this.props.auth0.user.email

        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: `/playlist?email=${this.props.user.email}`,
          headers: { "Authorization": `Bearer ${jwt}` }
        }
        const results = await axios(config);
        console.log(results.data);
        userPlaylist = true;
        this.setState({
          userPlaylist: results.data
        });
        if (results.data.length === 0) {
          // Create a new playlist if the user doesn't have one
          const createPlaylistConfig = {
            method: 'post',
            baseURL: process.env.REACT_APP_SERVER,
            url: `/playlist?email=${this.props.user.email}`,
            headers: { "Authorization": `Bearer ${jwt}` },
            data: {
              email: email,
              playlistName: 'My Playlist'
            }
          };

          await axios(createPlaylistConfig);
        }
      }


    } catch (err) {
      console.log("nay nay", err.response);
    }
    return userPlaylist;

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

  // postPlaylist = async (playlist) => {
  //   // add playlist to the database using a post request
  //   // once it is retrived from data base set it into state
  //   let playlistURL = 

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    this.getArtist();
  }
  // }

  changeArtistInput = (event) => {
    this.setState({
      artist: event.target.value
    });
  };

  addFavorite = async (songCard) => {
    const { favorites } = this.state;
    const newFavorites = [...favorites, songCard];
    this.setState({ favorites });
    const res = await this.props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    const config = {
      method: 'put',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/playlist?email=${this.props.auth0.user.email}`,
      headers: { "Authorization": `Bearer ${jwt}` },
      data: {
        email: this.props.auth0.user.email,
        songs: newFavorites,
      }
    }
    const result = await axios(config);
    console.log('result', result);
  };

  // postPlaylist = ()

  componentDidMount = async () => {
    if (this.props.auth0.isAuthenticated) {
      //check to see if user who is logged in has a playlist in the database
      // if they do have one get playlist will put it in state and return true
      let doesUserHavePlaylist = this.getPlaylist();
      // create playlist if user does not have one 
      if (doesUserHavePlaylist) {
        console.log('creating new playlist');
        let userPlaylist = {
          title: '',
          email: '',
          songs: []
        }

      }
    }
  }

  render() {
    // console.log(this.props.auth0.user);
    let songCards = [];
    console.log(this.state.artistData);
    if (this.state.artistData.length > 0) {
      songCards = this.state.artistData.map((artist, idx) => {
        // const ( title, album, && image ) = artist;
        // if (title && album && image) (
        console.log(artist);
        return (
          <SongCard
            key={idx}
            artist={artist}
            title={artist.title}
            album={artist.album}
            image={artist.image}
            name={this.state.artist}
            addFavorite={this.addFavorite}
          />
        )
        // ) else (
        //     return null;
        // )
      });
    }
    return (
      <>
        <header>
          <h1>Search Your Favorites!!</h1>
          <Form onSubmit={this.handleSearchSubmit}>
            <label>
              <input name="artist" onChange={this.changeArtistInput} />
            </label>
            <Button type="submit" className="button">Search</Button>
          </Form>
        </header>
        {this.state.error ? <p>{this.state.errorMessage}</p> :
          this.state.haveArtistData &&
          <main>
            {songCards}
          </main>
        }
      </>
    );

  }
}

export default withAuth0(Search);
