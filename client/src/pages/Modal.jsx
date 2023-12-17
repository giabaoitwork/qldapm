import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CallApi from '../api.js';
function MyModal(props) {
  const navigate = useNavigate();
  const [id, setId] = useState()
  const findRoom = () => {
    CallApi.getGame(id)
      .then((response) => {
        navigate(`/game/${response.data.id}`)

      })
      .catch((error) => {
        console.error(error);
        alert("Không tim thấy phòng")
      });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tham Gia
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Nhập id phòng</h4>
        <input type='text'
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ background: "none", border: "1px solid", outline: "none" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Đóng</Button>
        <Button onClick={findRoom}>Xác nhận</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyModal;