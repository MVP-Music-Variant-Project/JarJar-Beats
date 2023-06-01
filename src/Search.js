import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
// import Artist from './Artist.js'
// import Playlist from './Playlist.js'
import SongCard from './SongCard.js'


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
        }
    }
    handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            let artistUrl = `http://localhost:3001/searchSongs?name=${this.state.artist}`;
            let artist = await axios.get(artistUrl);
            this.setState({
                artistData: artist.data[0],
                error: false,
                haveArtistData: true,
            });
            this.getArtist(artist.data[0])
            // this.getSong()
        }
        catch (error) {
            console.log('error: ', error);
            console.log('error.message: ', error.message);
            this.setState({
                error: true,
                errorMessage: `An error Occured: ${error.response.status}`
            });
        }
    }
    getArtist = async (artist) => {
        try {
            let artistUrl = `${process.env.REACT_APP_SERVER}/searchSongs?name=${this.state.artist}`;
            // console.log('this is the artistUrl: ', artistUrl);
            let artistResponse = await axios.get(artistUrl);
            // console.log('this is the artistResponse: ', artistResponse);
            let artistData = artistResponse.data;
            this.setState({
                artistData: artistData
            })
            console.log('this is the artistData: ', artistData);
            // console.log('this is the album: ', album);
            // console.log('this is the artistData: ', artistData);
        } catch (error) {
            console.log('Error getting Artist: ', error);
        }
    };

    changeArtistInput = (event) => {
        this.setState({
            artist: event.target.value
        });
    };
    render() {
        let artist = [];
        console.log(this.state.artistData);
        if (this.state.artistData.length) {
            artist = this.state.artistData.map((artist, idx) => {

                return (
                    <SongCard
                        key={idx}
                        title={artist.title}
                        album={artist.album}
                        image={artist.image}
                    />
                )
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
                        {artist}
                    </main>
                }
            </>
        );
    }
}

export default Search;
