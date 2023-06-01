import { withAuth0 } from '@auth0/auth0-react';
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const CreatePlaylistButton = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState('');

  const createPlaylist = async () => {
    const res = await props.auth0.getIdTokenClaims();
    const jwt = res.__raw;
    const config = {
      method: 'post',
      baseURL: process.env.REACT_APP_SERVER,
      url: `/playlist?email=${props.auth0.user.email}`,
      headers: { "Authorization": `Bearer ${jwt}` },
      data: {
        email: props.auth0.user.email,
        title: playlistTitle,
        songs: [],
      }
    }
    const result = await axios(config);
    setShowModal(false);
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        New Playlist
      </Button>
      <Modal show={showModal}>
        <Modal.Header>
            <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <div class="modal-body">
            <div>
              <label>Playlist Title:</label><input value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} type="text" />
            </div>
            <div>
              <Button onClick={() => createPlaylist()}>
                Create
              </Button>
            </div>
        </div>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
            >Close</button>
        </div>
    </Modal >
    </>
  );
};

export default withAuth0(CreatePlaylistButton);
