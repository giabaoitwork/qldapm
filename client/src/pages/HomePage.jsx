import { useEffect, useState } from 'react';
import assets from '../assets';

import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function HomePage() {
    const navigate = useNavigate();

    const handleStartClick = () => {
        // Xử lý khi nút "Start" được click
        console.log('Game started!');
        // Thêm các hàm xử lý khác tại đây
    };

    const handleViewReviewClick = () => {
        // Xử lý khi nút "Xem Đánh Giá" được click
        console.log('View review clicked!');
        // Thêm các hàm xử lý khác tại đây
    };
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
        position: 'relative', // Thêm thuộc tính position để có thể định vị tương đối
    };

    const imgStyle = {
        alignSelf: 'center', // Đặt ảnh ở trên cùng
        marginBottom: '50px', // Khoảng cách 20px giữa ảnh và nút
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={cssObj}>
                <img src={assets.svg.green_star} style={{ position: 'absolute', top: '0', left: '0' }} alt="" />

                <img src={assets.svg.green_star} style={{ position: 'absolute', top: '0', right: '0' }} alt="" />

                <img
                    className="cursor-pointer"
                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/385526164_1026054271847466_7864728018404994163_n.png?_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_ohc=m_6Eh1UXQtgAX_wiaRD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdR-zrtBiFwxhUM1L_b1m7Xvlp90QMMGTNHO3CAYEnUaEg&oe=65926C9F"
                    alt=""
                    style={imgStyle}
                    onClick={() => navigate('/begin')}
                />
                <div className="content">
                    <Container className="mt-5">
                        <Row>
                            <Col md={12} className="text-center">
                                <Button
                                    style={{ backgroundColor: '#00FFB0', borderColor: 'white' }}
                                    variant="primary"
                                    size="lg"
                                    onClick={handleViewReviewClick}
                                >
                                    Xem Đánh Giá
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
