import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Table as BootstrapTable } from 'react-bootstrap';
import CallApi from '../api.js';
import { useParams } from 'react-router-dom';
const Table = () => {
    const [players, setPlayers] = useState([])
    const { id } = useParams()

    useEffect(() => {
        CallApi.getUser(id)
            .then((response) => {
                setPlayers(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    width: '800px',
                    padding: '20px',
                    borderRadius: '30px',
                    position: 'relative',
                }}
            >
                <BootstrapTable striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th colSpan="2" style={{ textAlign: 'center' }}>
                                Mã Phòng: {id}
                            </th>
                            <th colSpan="4" style={tableHeaderTitleStyle}>
                                Danh Sách Người Chơi
                            </th>
                        </tr>
                        <tr>
                            <th style={tableHeaderStyle}>NO</th>
                            <th style={tableHeaderStyle}>Tên</th>
                            <th style={tableHeaderStyle}>Số điện thoại</th>
                            <th style={tableHeaderStyle}>Email</th>
                            <th style={tableHeaderStyle}>Điểm</th>
                            <th style={tableHeaderStyle}>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players && players.map((player, index) => (
                            <tr key={index}>
                                <td style={tableCellStyle}>{index + 1}</td>
                                <td style={tableCellStyle}>{player.name}</td>
                                <td style={tableCellStyle}>{player.phone}</td>
                                <td style={tableCellStyle}>{player.email}</td>
                                <td style={tableCellStyle}>{player.score}</td>
                                <td style={tableCellStyle}>{player.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </BootstrapTable>
            </div>
        </div>
    );
};

const tableHeaderTitleStyle = {
    textAlign: 'center',
    padding: '20px',
    fontWeight: 'bold',
    fontSize: '1.5em',
};

const tableHeaderStyle = {
    textAlign: 'center',
    padding: '20px',
};

const tableCellStyle = {
    textAlign: 'center',
    padding: '20px',
};

export default Table;
