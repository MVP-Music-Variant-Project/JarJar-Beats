import React from "react";
import Card from "react-bootstrap/Card";
// import { withAuth0 } from '@auth0/auth0-react';
// import Typography from "react-bootstrap/Typography"

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      // artist: this.state.artist
    }
  }

  render() {
    return (
      <>
        <Card className='Artist' style={{ width: '50%' }}>
          <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Img src={this.props.image} style={{ width: '40%' }}></Card.Img>
            <Card.Text onClick={() => this.props.addFavorite(this.props.artist)}>&#9825;</Card.Text>
            <Card.Text>Artist: {this.props.name}</Card.Text>
            <Card.Text>Album: {this.props.album}</Card.Text>
          </Card.Body>
        </Card>
      </>

    )
  }
}

export default SongCard;
// export default withAuth0(SongCard);
