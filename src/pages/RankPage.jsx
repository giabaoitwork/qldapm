import assets from '../assets';

function RankPage() {
    const listUser = [
        { name: 'Hồ Thanh Hoài An', score: 2000, time: 100 },
        { name: 'Phạm Gia Bảo', score: 1800, time: 150 },
        { name: 'Cao Sỹ Bel', score: 1600, time: 120 },
        { name: 'Đỗ Phú Nguyên Chương', score: 1400, time: 90 },
    ];

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
                                    <div className="text-white text-lg">{user.score} điểm</div>
                                    {/* <div className="text-white text-2xl">{user.time}s</div> */}
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
