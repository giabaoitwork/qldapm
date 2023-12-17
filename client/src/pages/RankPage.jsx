import { useEffect, useState } from 'react';
import assets from '../assets';
import { useParams } from 'react-router-dom';
import CallApi from '../api.js';
function RankPage() {
    const { id } = useParams();
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        CallApi.getRank(id)
            .then((response) => {
                setListUser(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])


    return (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col gap-5 w-fit m-auto">
            <div className="flex gap-2 justify-center items-center">
                <img src={assets.svg.rank} alt="" />
                <div className="text-white font-bold text-[37px]">Bảng xếp hạng</div>
            </div>

            {listUser.map((user, index) => {
                return (
                    <div key={index} className="relative flex justify-between items-center p-5 w-[500px] h-[100px]">
                        <div className="absolute w-[500px] h-full opacity-50 bg-gray-500 rounded-[9999px] -z-[1]"></div>
                        <div className="flex items-center gap-2">
                            <img className="w-[100px]" src={assets.svg.human} alt="" />
                            <div className="">
                                <div className="text-white text-2xl">{user.name}</div>
                                <div className="flex justify-between items-center">
                                    <div className="text-white text-lg">{user.score} điểm {user.timeEnd}s</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-white text-2xl">{index + 1}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default RankPage;
