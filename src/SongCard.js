import React from "react";
import Card from "react-bootstrap/Card";
// import Typography from "react-bootstrap/Typography"

class SongCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0
    }
  }

  render() {
    return (
      <>
        <Card className='Artist' style={{ width: '50%' }}>
          <Card.Body>
            <Card.Img src={this.props.image} style={{ width: '40%' }}></Card.Img>
            <Card.Title>{this.props.artist}</Card.Title>
            <Card.Text>Song: {this.props.title}</Card.Text>
            <Card.Text>Album: {this.props.album}</Card.Text>
          </Card.Body>
        </Card>
      </>

    )
  }
}

export default SongCard;