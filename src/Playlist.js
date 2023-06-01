import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
// import search from './search.js'
// import { Form } from 'react-bootstrap';
// import { Card } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import SongCard from './SongCard';

class Playlist extends React.Component {

  // class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('!!!!!', e.target);
    let playlistToUpdate = {
      title: e.target.title.value || this.props.playlist.title,
      // album: e.target.album.value || this.props.album.description,
      // img: e.target.img || this.props.playlist
    };
    this.props.putPlaylist(playlistToUpdate)
  }

  //if you send the email address as query with this request it will return only the playlists that were created by the user that logged in. 
  getPlaylist = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/playlist',
          headers: { "Authorization": `Bearer ${jwt}` }

        }
        const results = await axios(config);
        console.log(results.data);
      }
    } catch (err) {
      console.log("nay nay", err.response);
    }
  }

  postPlaylist = async (newPlaylist) => {

  }

  deletePlaylist = async (Playlist) => {

  }

  putPlaylist = async (playlistToUpdate) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/playlist',
          headers: { "Authorization": `Bearer ${jwt}` },
          data: {
            title: playlistToUpdate.title,
          },
        };

        const response = await axios(config);
        console.log(response.data);
      }
    } catch (err) {
      console.log("Error updating playlist:", err.response);
    }
  }

  handleUpdatePlaylist = async (index) => {
    const playlistToUpdate = {
      title: 'New Playlist Title', // Replace with the new title
    };

    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'put',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/playlist',
          headers: { "Authorization": `Bearer ${jwt}` },
          data: playlistToUpdate,
        };

        const response = await axios(config);
        console.log(response.data);

        // Update the state with the updated playlist
        const updatedFavorites = [...this.state.favorites];
        updatedFavorites[index].title = playlistToUpdate.title;
        this.setState({ favorites: updatedFavorites });
      }
    } catch (err) {
      console.log("Error updating playlist:", err.response);
    }
  };

  componentDidMount() {
    this.getPlaylist();
  }

  render() {
    // const { user } = this.props.auth0;
    console.log(this.props.auth0.user);
    return (
      <>
        <h1>Fav Songs</h1>
        <SongCard />
        {/* <Card>
          <Form>
            <Card.Title>Playlist</Card.Title>
            {this.state.favorites.map((favorite, idx) => (
              <div key={idx}>
                <Card.Title>{favorite.title}</Card.Title>
                <Card.Text>{favorite.album}</Card.Text>
                <Card.Img src={favorite.image} alt="" />
                <Button
                  variant="primary"
                  onClick={() => this.handUpdatePlaylist(idx)}>Update Name</Button>
                <Playlist user={user} />
              </div>
            ))}
          </Form>
        </Card> */}
      </>
    )
  }
}

export default withAuth0(Playlist);
