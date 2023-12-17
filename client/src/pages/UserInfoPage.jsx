import { useEffect, useState } from 'react';
import assets from '../assets';
import CallApi from '../api.js';
import { useParams, useNavigate } from 'react-router-dom';
function UserInfoPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { gameId, time, score } = useParams();
    const navigate = useNavigate();

    const addUser = () => {
        CallApi.saveUser(name, phone, email, time, score, gameId)
            .then((response) => {
                console.log(response.data.message)
                navigate(`/rank/${gameId}`)
            })
            .catch((error) => {
                console.log((error))
            })
    }
    return (
        <div className="absolute p-10 flex gap-10 flex-col rounded-[30px] items-center w-[500px] bg-white left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
            <img
                className="absolute right-0 top-0 translate-x-[30%] -translate-y-[20%]"
                src={assets.svg.user_info}
                alt=""
            />
            <div className="text-2xl font-bold italic">Thông tin người chơi</div>
            <div className="flex flex-col gap-4 w-full">
                <div className="flex gap-5 items-center">
                    <img className="w-50px" src={assets.svg.note} alt="" />
                    <div className="px-2 py-4 flex-1 border border-[#E5DFDF] bg-white rounded-[30px] drop-shadow-xl">
                        <input
                            className="w-full focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tên người dùng"
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <img className="w-50px" src={assets.svg.phone} alt="" />
                    <div className="px-2 py-4 flex-1 border border-[#E5DFDF] bg-white rounded-[30px] drop-shadow-xl">
                        <input
                            className="w-full focus:outline-none"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Số điện thoại"
                        />
                    </div>
                </div>
                <div className="flex gap-5 items-center">
                    <img className="w-50px" src={assets.svg.mail} alt="" />
                    <div className="px-2 py-4 flex-1 border border-[#E5DFDF] bg-white rounded-[30px] drop-shadow-xl">
                        <input
                            className="w-full focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                </div>
            </div>
            <div onClick={addUser} className="flex items-center justify-center gap-4 px-10 py-4 bg-[#00FFB0] rounded-[30px] cursor-pointer">
                <img src={assets.svg.arrow_right} alt="" />
                <div className="text-2xl">Tiếp tục</div>
            </div>
        </div>
    );
}

export default UserInfoPage;
