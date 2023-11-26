import { useEffect, useState } from 'react';
import assets from '../assets';

function ReviewPage() {
    const listQuickReviews = ['Rất tệ', 'Bình thường', 'Rất hay', 'Tuyệt vời'];

    const [starScore, setStarScore] = useState(1);
    const [quickReview, setQuickReview] = useState('');
    const [detailReview, setDetailReview] = useState('Hello');

    const handleScore = (position) => {
        setStarScore(position);
    };
    const handleDetailReviewChange = (event) => {
        setDetailReview(event.target.value);
    };

    const handleSendReview = () => {};

    useEffect(() => {
        console.log(starScore, quickReview, detailReview);
    }, [starScore, quickReview, detailReview]);

    function RenderStar() {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    onClick={() => handleScore(i)}
                    className="cursor-pointer w-[30px] h-[30px]"
                    src={i <= starScore ? assets.svg.yellow_star : assets.svg.star_border}
                    alt=""
                />,
            );
        }
        return stars;
    }

    function RenderQuickReviews() {
        const quickReviews = [];
        for (let i = 0; i < listQuickReviews.length; i++) {
            const isSelected = listQuickReviews[i] === quickReview;
            quickReviews.push(
                <div
                    key={i}
                    onClick={() => {
                        setQuickReview(listQuickReviews[i]);
                    }}
                    className={`flex cursor-pointer px-[10px] py-[4px] justify-center items-center rounded-[30px] bg-[#d6d2d2] hover:bg-[#BDB6B6] border w-fit 
                ${isSelected ? 'border-black' : 'border-gray-50'}`}
                >
                    {listQuickReviews[i]}
                </div>,
            );
        }
        return quickReviews;
    }

    return (
        <div className="w-screen h-screen relative">
            <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
            <div className="absolute p-[20px] w-[600px] bg-white rounded-[30px]  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                <img
                    className="absolute right-0 translate-x-[30%] -translate-y-[40%]"
                    src={assets.svg.green_star}
                    alt=""
                />
                <div className="text-2xl font-bold m-auto text-center italic">Đánh giá trò chơi</div>
                <div className="flex flex-col gap-5 mt-14">
                    <div className="flex items-center gap-[20px]">
                        <div className="w-[150px]">Đánh giá sao:</div>
                        <div className="flex gap-4">
                            <RenderStar />
                        </div>
                    </div>
                    <div className="flex items-center gap-[20px]">
                        <div className="w-[150px]">Đánh giá nhanh:</div>
                        <div className="flex flex-wrap gap-4">
                            <RenderQuickReviews />
                        </div>
                    </div>
                    <div className="flex items-center gap-[20px]">
                        <div className="w-[150px]">Đánh giá chi tiết:</div>
                        <div className="flex-1 p-[10px] h-[140px] border border-[#E5DFDF] rounded-[30px]">
                            <textarea
                                onChange={handleDetailReviewChange}
                                value={detailReview}
                                rows={5}
                                className="w-full resize-none focus-visible:outline-none"
                                placeholder="Phản hồi và đánh giá chúng tôi tại đây..."
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSendReview}
                        className="cursor-pointer px-16 py-1 m-auto bg-[#00FFB0] hover:bg-[#4de2ce] rounded-[30px]"
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewPage;
