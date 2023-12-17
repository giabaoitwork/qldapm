import { useNavigate } from 'react-router';
import assets from '../assets';

const BeginPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center absolute px-5 py-10 bg-white rounded-[30px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p className="text-[64px]">Settings</p>
            <div>
                <div className="flex items-center gap-3 mb-5">
                    <p className="min-w-[100px]">Số lượt gợi ý:</p>
                    <div className="p-2 border rounded-2xl">
                        <input className="focus:outline-none" type="number" min={0} />
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-5">
                    <p className="min-w-[100px]">Thời gian:</p>
                    <div className="p-2 border rounded-2xl">
                        <input className="focus:outline-none" type="number" min={0} />
                    </div>
                    <p>Đơn vị giây (s)</p>
                </div>

                <div className="p-2 flex flex-col justify-center items-center border rounded-2xl">
                    <p className="text-[32px]">Tùy chỉnh về màn chơi</p>
                    <div className="flex flex-col gap-3 max-h-[200px] overflow-auto">
                        <div className="flex gap-3 items-center">
                            <p className="font-bold text-[24px] mim-w-[90px]">Level 1</p>
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="font-bold text-[24px] mim-w-[90px]">Level 2</p>
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="font-bold text-[24px] mim-w-[90px]">Level 3</p>
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="font-bold text-[24px] mim-w-[90px]">Level 4</p>
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <p className="font-bold text-[24px] mim-w-[90px]">Level 5</p>
                            <div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <p>Tải ảnh lên:</p>
                                    <div className="p-2 border rounded-2xl">
                                        <input type="file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/game')}
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
