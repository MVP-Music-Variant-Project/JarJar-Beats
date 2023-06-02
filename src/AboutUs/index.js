import React from 'react';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import './index.css';

class AboutUs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalInfo: {
                title: '',
                body: '',
            },
        }
    }

    renderModal(info) {
        this.setState({
            showModal: true,
            modalInfo: {
                title: info.title,
                body: info.body,
            }
        })
    }

    render() {
        return (
            <>
                <main>

                    <h1> Click on an Image & get to know us!</h1>
                    <div className='AboutContainer'>
                        <img
                            src="./images/ashley.jpeg"
                            alt="Pic of Ashley"
                            onClick={() => this.renderModal({
                                title: 'My name is Ashley',
                                body: 'Ashley has a diverse professional background that ranges from military service, government contracting as a geolocation intelligence analyst, managerial roles, mentoring, building and facilitating training programs as well as expereince in forward facing costumer service roles through entrepreneaurship. She is confident that each of these skills will allow her add value to her next role.',
                            })}
                            className="profileImg"
                        />
                        <img
                            src="./images/anton.jpeg"
                            alt="Pic of Anthony"
                            onClick={() => this.renderModal({
                                title: 'My name is Anthony',
                                body: 'Anthony is a software engineer from Spokane, Washington. Anthony was in a university taking computer science but his expectations were not being met. Anthony has heard good things about Code Fellows and wanted to pursue new opportunities. Anthony is super excited to start this new path in his life.',
                            })}
                            className="profileImg"
                        />
                        <img
                            src="./images/tiffani.jpeg"
                            alt="Pic of Tiff"
                            onClick={() => this.renderModal({
                                title: 'Hi, how are ya?',
                                body: 'I am Tiffani Rice, an adaptable Full Stack Software Developer with a passion for solving complex problems, bringing people together, and creating fully accessible programs. With 7 years of experience in the aviation industry and an intensive acquired education in software development from Code Fellows, I help bring a unique perspective and a fresh set of skills to any team.',
                            })}
                            className="profileImg"
                        />

                        <img
                            src="./images/jared.jpg"
                            alt="Pic of Jared"
                            onClick={() => this.renderModal({
                                title: 'My name is Jared',
                                body: 'Software Enginee Former marine with 7 years working in government and team management. Went to college for communications and have an active secret clearance. Spent 6 years as military police officer. I like cats and sappy movies.',
                            })}
                            className="profileImg"
                        />

                        <img
                            src="./images/andrew.jpeg"
                            alt="Pic of Andrew"
                            onClick={() => this.renderModal({
                                title: 'I Am Andrew Carroll',
                                body: 'Improv Poet, Speaker, Author, Healer.  My worst quality is Software Development.  But AI is going to take care of that...I may not always get it right, but I am always growing.',
                            })}
                            className="profileImg"
                        />
                        <img
                            src="./images/dan.jpeg"
                            alt="Pic of Dan"
                            onClick={() => this.renderModal({
                                title: 'This is Dan',
                                body: 'Dan is a 29 year old musician and outdoor enthusiest from Seattle. He plays in a band called The Boards. After 10 years of being a bike messenger in downtown Seattle he decided to switch to a career that wasn\'t so dangerous and allowed him to spend more time with his family and dogs. So far he has made sereral awesome projects with his Codefellows cohort and is exited for the future of his career.',
                            })}
                            className="profileImg"
                        />

                    </div>

                    <Modal show={this.state.showModal}>
                        <Modal.Header>
                            <Modal.Title>{this.state.modalInfo.title}</Modal.Title>
                        </Modal.Header>
                        <div class="modal-body">
                            <p>{this.state.modalInfo.body}</p>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-default"
                                data-dismiss="modal"
                                onClick={() => this.setState({ showModal: false })}
                            >Close</button>
                        </div>
                    </Modal >
                </main>
            </>
        );
    }
}

export default AboutUs;
