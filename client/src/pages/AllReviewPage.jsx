import { useState } from 'react';
import assets from '../assets';
import { useNavigate } from 'react-router';

function AllReviewPage() {
    const listUser = [
        {
            name: 'Phạm Gia Bảo',
            time: '1/12/2023',
            scores: 3,
            quickReview: 'Cần phát triển thêm tính năng',
            detailReview: 'Game rất hay và thú vị mong có nhiều nâng cấp nhiều tính năng hay hơn',
        },
        {
            name: 'Hồ Thanh Hoài An',
            time: '1/12/2023',
            scores: 5,
            quickReview: 'Game rất hay',
            detailReview: 'Game rất hay và thú vị mong có nhiều nâng cấp nhiều tính năng hay hơn',
        },
        {
            name: 'Cao Sỹ Bel',
            time: '1/12/2023',
            scores: 1,
            quickReview: 'Game rất hay',
            detailReview: 'Game rất hay và thú vị mong có nhiều nâng cấp nhiều tính năng hay hơn',
        },
        {
            name: 'Đỗ Phú Nguyên Chương',
            time: '1/12/2023',
            scores: 3,
            quickReview: 'Game rất hay',
            detailReview: 'Game rất hay và thú vị mong có nhiều nâng cấp nhiều tính năng hay hơn',
        },
    ];

    const [userReviews, setUserReviews] = useState(listUser);
    const navigate = useNavigate();

    const getListScore = () => {
        return listUser.map((userReview) => userReview.scores);
    };

    const getListTotalReviewOnScore = () => {
        const scores = getListScore();
        const totalReviewOnScore = [0, 0, 0, 0, 0];
        for (let i = 0; i < scores.length; i++) {
            totalReviewOnScore[scores[i] - 1] = totalReviewOnScore[scores[i] - 1] + 1;
        }
        return totalReviewOnScore;
    };

    const avgScore = () => {
        const scores = getListScore();
        let sumScores = 0;
        if (scores.length === 0) return 0;
        for (let i = 0; i < scores.length; i++) {
            sumScores += scores[i];
        }

        return (sumScores / scores.length).toFixed(1);
    };

    const renderStar = (scores) => {
        const result = [];
        for (let i = 0; i < scores; i++) {
            result.push(<img key={i} src={assets.svg.yellow_star} alt="" />);
        }
        return result;
    };

    const renderFillterStar = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <div
                    key={i}
                    onClick={() => handleFill(5 - i)}
                    className="flex px-4 py-1 justify-center items-center gap-2 rounded-[30px] border text-[20px] cursor-pointer"
                >
                    {5 - i} <img src={assets.svg.yellow_star} alt="" />
                </div>,
            );
        }
        return result;
    };
    const handleFill = (score) => {
        console.log(score);
        const filter = listUser.filter((userReview) => userReview.scores === score);
        console.log(filter);
        setUserReviews(filter);
    };

    const renderChart = () => {
        const result = [];
        const listTotalReviewOnScore = getListTotalReviewOnScore();
        const sumReviews = listTotalReviewOnScore.reduce((sumReviews, currentReview) => sumReviews + currentReview, 0);
        for (let i = 0; i < 5; i++) {
            const percent = ((listTotalReviewOnScore[5 - i - 1] / sumReviews) * 100).toFixed(0);
            const styteWidth = {
                width: `${percent}%`,
            };
            result.push(
                <div key={i} className="flex gap-3 items-center">
                    <div className="flex items-center">
                        {5 - i} <img className="h-full w-auto" src={assets.svg.yellow_star} alt="" />
                    </div>
                    <div className="flex-1 relative">
                        <div className="w-full h-3 rounded-lg border"></div>
                        <div className={`absolute top-0 left-0 h-3 rounded-lg bg-green-500`} style={styteWidth}></div>
                    </div>
                    <div>{listTotalReviewOnScore[5 - i - 1]} đánh giá</div>
                </div>,
            );
        }
        return result;
    };

    return (
        <div className="h-[600px] flex flex-col justify-center items-center absolute px-5 py-10 bg-white rounded-[30px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <img
                className="absolute w-[100px] top-0 right-0 translate-x-[30%] -translate-y-[20%]"
                src={assets.svg.eye}
                alt=""
            />
            <div className="font-bold text-[36px] italic mb-4">Xem đánh giá của người chơi về trò chơi</div>
            <div className="flex flex-wrap h-[70%] overflow-auto justify-center">
                <div className="overflow-y-auto">
                    <div className="flex gap-3 items-center mb-9">{renderFillterStar()}</div>
                    <div className="flex gap-10 flex-wrap justify-center">
                        <div className="flex-1 min-w-[500px] w-[100%] overflow-auto">
                            {userReviews.map((userReview, index) => {
                                return (
                                    <div className="flex border-b mt-2 pb-2" key={index}>
                                        <img className="w-[50px] h-[50px]" src={assets.svg.human} alt="" />
                                        <div className="items-center">
                                            <div className="flex">
                                                <div className="mr-4 text-[26px]">{userReview.name}</div>
                                                <div className="flex gap-2 items-center">
                                                    <img src={assets.svg.clock} alt="" />
                                                    <div>{userReview.time}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="flex gap-2">{renderStar(userReview.scores)}</div>
                                                <div className="px-4 py-1 border rounded-[30px]">
                                                    {userReview.quickReview}
                                                </div>
                                            </div>
                                            <div className="max-w-[400px]">{userReview.detailReview}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="min-w-[300px]">
                    <div className="flex flex-col justify-center items-center gap-3 mb-5">
                        <div>{avgScore()}/5</div>
                        <div className="flex gap-3">{renderStar(avgScore())}</div>
                        <div>5 Đánh giá</div>
                    </div>
                    <div>{renderChart()}</div>
                </div>
            </div>
            <div
                onClick={() => navigate('/')}
                className="flex px-4 py-2 mt-3 gap-3 rounded-[30px] border bg-[#00FFB0] cursor-pointer"
            >
                <img className="rotate-180" src={assets.svg.arrow_right} alt="" />
                <div className="text-[32px]">Trở về</div>
            </div>
        </div>
    );
}

export default AllReviewPage;
