import { useNavigate } from 'react-router';
import assets from '../assets';
import { useEffect, useState } from 'react';
import CallApi from '../api.js';
const BeginPage = () => {
    const [suggest, setSuggest] = useState('')
    const [gameTime, setGameTime] = useState()
    const [srcs, setSrcs] = useState({})
    const [srcOthers, setSrcOthers] = useState({})
    const [maxLevel, setMaxLevel] = useState(0)
    const navigate = useNavigate();

    const createGame = () => {
        CallApi.addGame(suggest, gameTime)
            .then(async (response) => {
                console.log(response.data.message)
                for (const key of Object.keys(srcs)) {
                    await CallApi.upload(srcs[key][1], response.data.id, key)
                        .then((response) => {
                            console.log(response.data.message)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    await CallApi.upload(srcOthers[key][1], response.data.id, key)
                        .then((response) => {
                            console.log(response.data.message)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    CallApi.addRounds(response.data.id, key, srcs[key][0], srcOthers[key][0])
                        .then((response) => {
                            console.log(response.data.message)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    navigate(`/player/${response.data.id}`)
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const handleChooseFile = (e, level, other) => {
        const image = e.target.files[0]
        if (other) {
            setSrcOthers((prev) => ({
                ...prev,
                [level]: [image.name, image]
            }))
        }
        else {
            setSrcs((prev) => ({
                ...prev,
                [level]: [image.name, image]
            }))
        }
    }
    useEffect(() => {
        console.log(srcs)
        console.log(srcOthers)
    }, [srcs])

    useEffect(() => {
        CallApi.getMaxLevel()
            .then((response) => {
                setMaxLevel(response.data.maxLevel)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center absolute px-5 py-10 bg-white rounded-[30px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p className="text-[64px]">Settings</p>
            <div>
                <div className="flex items-center gap-3 mb-5">
                    <p className="min-w-[100px]">Số lượt gợi ý:</p>
                    <div className="p-2 border rounded-2xl">
                        <input
                            value={suggest}
                            onChange={(e) => setSuggest(e.target.value)}
                            className="focus:outline-none" type="number" min={0} max={3} />
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <p className="min-w-[100px]">Thời gian:</p>
                    <div className="p-2 border rounded-2xl">
                        <input
                            value={gameTime}
                            onChange={(e) => setGameTime(e.target.value)}
                            className="focus:outline-none" type="number" min={0} />
                    </div>
                    <p>Đơn vị giây (s)</p>
                </div>

                <div className="p-2 flex flex-col justify-center items-center border rounded-2xl">
                    <p className="text-[32px]">Tùy chỉnh về màn chơi</p>
                    <div className="flex flex-col gap-3 max-h-[200px] overflow-auto">
                        {[...Array(maxLevel).keys()].map(level => (
                            <div
                                key={level + 1}
                                className="flex gap-3 items-center">
                                <p className="font-bold text-[24px] mim-w-[90px]">Level {level + 1}</p>
                                <div>
                                    <div className="flex gap-3 items-center">
                                        <p>Tải ảnh lên:</p>
                                        <div className="p-2 border rounded-2xl">
                                            <input
                                                onChange={(e) => handleChooseFile(e, level + 1, false)}
                                                type="file"
                                                accept=".png, .jpg"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <p>Tải ảnh lên:</p>
                                        <div className="p-2 border rounded-2xl">
                                            <input
                                                onChange={(e) => handleChooseFile(e, level + 1, true)}
                                                type="file"
                                                accept=".png, .jpg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    onClick={() => createGame()}
                    className="mx-auto mt-3 flex items-center w-fit justify-center gap-4 px-10 py-4 bg-[#00FFB0] rounded-[30px] cursor-pointer"
                >
                    <div className="text-2xl">Tiếp tục</div>
                    <img src={assets.svg.arrow_right} alt="" />
                </div>
            </div>
        </div>
    );
};

export default BeginPage;
