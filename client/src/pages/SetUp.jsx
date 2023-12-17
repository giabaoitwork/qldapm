import { useEffect, useState } from 'react';
import assets from '../assets';

import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyModal from './Modal';
function SetUp() {
    const cssObj = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '500px',
        height: '500px',
        padding: '20px',
        borderRadius: '30px',
        position: 'relative',
    };

    const [isHoveredButton1, setHoveredButton1] = useState(false);
    const [isHoveredButton2, setHoveredButton2] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleJoin = () => {
        setModalShow(true)
    };

    const handleCreateRoom = () => {
        navigate('/begin')
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={cssObj}>
                <div
                    style={{
                        width: '350px',
                        height: '350px',
                        border: '1px solid #BABABA ',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '50px',

                        borderRadius: '30px',
                    }}
                >
                    <img src={assets.svg.green_star} style={{ position: 'absolute', top: '0', left: '0' }} alt="" />

                    <img src={assets.svg.green_star} style={{ position: 'absolute', top: '0', right: '0' }} alt="" />

                    <div className="content">
                        <p style={{ position: 'absolute', top: '0', left: '38%', fontSize: '50px' }}>Setup</p>
                        <Container className="mt-5">
                            <Row>
                                {isHoveredButton1 && (
                                    <img
                                        src={assets.svg.green_star}
                                        style={{ width: '50px', position: 'absolute', left: '18%', top: '40%' }}
                                    ></img>
                                )}
                                <Col md={12} className="text-center">
                                    <Button
                                        style={{
                                            width: ' 200px',
                                            backgroundColor: '#00FFB0',
                                            borderColor: 'Black ',
                                            marginBottom: '40px',
                                            fontSize: '40px',
                                            borderRadius: '30px',
                                        }}
                                        variant="primary"
                                        size="lg"
                                        onClick={handleJoin}
                                        onMouseOver={() => setHoveredButton1(true)}
                                        onMouseOut={() => setHoveredButton1(false)}
                                    >
                                        Tham gia
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                {isHoveredButton2 && (
                                    <img
                                        src={assets.svg.green_star}
                                        style={{ width: '50px', position: 'absolute', left: '18%', top: '60%' }}
                                    ></img>
                                )}
                                <Col md={12} className="text-center">
                                    <Button
                                        style={{
                                            width: ' 200px',
                                            backgroundColor: '#00FFB0',
                                            borderColor: 'white',
                                            fontSize: '40px',
                                            borderRadius: '30px',
                                        }}
                                        variant="primary"
                                        size="lg"
                                        onClick={handleCreateRoom}
                                        onMouseOver={() => setHoveredButton2(true)}
                                        onMouseOut={() => setHoveredButton2(false)}
                                    >
                                        Tạo màn
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        <MyModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetUp;
