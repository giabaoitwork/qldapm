import { useEffect, useState } from 'react';
import assets from '../assets';
import CallApi from '../api.js';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
function GamePage() {
    const { id } = useParams();
    const [rowsAndCols, setRowsAndCols] = useState([0, 0]);
    const [differentIndex, setDifferentIndex] = useState(0);
    const [suggestQuantity, setSuggestQuantity] = useState(0);
    const [level, setLevel] = useState(1);
    const [bonusScore, setbonusScore] = useState(0);
    const [minusScore, setMinusScore] = useState(0);
    const [time, setTime] = useState(null);
    const [gameId, setGameId] = useState(0);
    const [scr, setScr] = useState(null);
    const [scrOther, setScrOther] = useState(null);
    const [score, setScore] = useState(0);
    const [timeCurent, setTimeCurent] = useState(0)
    const navigate = useNavigate();
    const formatCountDown = (countDown) => {
        const minutes = Math.floor(countDown / 60);
        const remainingSeconds = countDown % 60;

        const formattedTime = `${minutes > 0 ? `${minutes}:` : ''}${remainingSeconds}`;

        return formattedTime;
    };

    const handleCallLevel = () => {
        CallApi.getLevel(level)
            .then((response) => {
                setRowsAndCols([response.data.row, response.data.col]);
                setLevel(response.data.id);
                setbonusScore(response.data.bonusScore);
                setMinusScore(response.data.minusScore);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCallGame = () => {
        CallApi.getGame(id)
            .then((response) => {
                setGameId(response.data.id);
                setSuggestQuantity(response.data.suggest);
                setTime(response.data.gameTime - 1);
                setTimeCurent(response.data.gameTime)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCallRound = () => {
        const googleStorage = `https://storage.googleapis.com/image_qlda/${gameId}/lv${level}/`;
        CallApi.getRound(gameId, level)
            .then((response) => {
                console.log(googleStorage + response.data.scr);
                setScr(googleStorage + response.data.scr);
                setScrOther(googleStorage + response.data.scrOther);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSelect = (element, bool) => {
        if (bool) {
            const divElement = document
                .getElementById('wapper-game')
                .querySelector(`div:nth-child(${differentIndex + 1})`);
            divElement.classList.add('relative');
            const borderDiv = document.createElement('div');
            if (divElement.classList.contains('border-[2px]', 'border-[red]')) {
                divElement.classList.remove('border-[2px]', 'border-[red]');
            }
            borderDiv.className =
                'w-full h-full absolute top-0 left-0 bg-transparent border-[5px] border-[red] rounded-full';
            divElement.appendChild(borderDiv);
            setScore((prev) => prev + bonusScore);
            setTimeout(() => {
                setLevel(level + 1);
                divElement.classList.remove('relative');
                divElement.removeChild(borderDiv);
            }, 1000);
        }
        if (!bool) {
            setScore((prev) => prev - minusScore);
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 500);
        }
    };

    const handleSuggest = () => {
        if (suggestQuantity <= 0) return;
        const imgElement = document.getElementById('wapper-game').querySelector(`div:nth-child(${differentIndex + 1})`);
        imgElement.classList.add('border-[2px]', 'border-[red]');
        setSuggestQuantity((prev) => prev - 1);
        setScore((prev) => prev - minusScore);
    };

    const renderImage = () => {
        const elements = [];
        for (let i = 0; i < rowsAndCols[0] * rowsAndCols[1]; i++) {
            if (i === differentIndex) {
                elements.push(
                    <div key={i} onClick={(e) => handleSelect(e.curentTarger, true)} className="w-[90px] h-[90px]">
                        <img className="w-full h-full" src={scr} alt="" />
                    </div>,
                );
            } else {
                elements.push(
                    <div key={i} onClick={(e) => handleSelect(e.currentTarget, false)} className="w-[90px] h-[90px]">
                        <img className="w-full h-full" src={scrOther} alt="" />
                    </div>,
                );
            }
        }
        const gridContainerStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(' + rowsAndCols[1] + ', minmax(0, 1fr))',
            width: 'fit-content',
            height: 'fit-content',
        };
        return (
            <div id="wapper-game" style={gridContainerStyle}>
                {elements}
            </div>
        );
    };

    useEffect(() => {
        handleCallGame();
        handleCallLevel();
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev > 0) return prev - 1;
                else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);
    }, []);

    useEffect(() => {
        handleCallRound();
    }, [gameId, level]);

    useEffect(() => {
        setDifferentIndex(Math.floor(Math.random() * rowsAndCols[0] * rowsAndCols[1]));
    }, [rowsAndCols]);

    useEffect(() => {
        handleCallLevel();
    }, [level]);

    useEffect(() => {
        if (level > 5 || time === 0) {
            navigate(`/userinfo/${id}/${timeCurent - time}/${score}`);
        }
    });



    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-around items-center p-5 w-full bg-[#8EF924] h-[100px]">
                <div className="flex justify-center p-2 items-center rounded-full bg-[#F54923]">
                    <div className="text-[50px] text-white font-bold">Đề {level}:</div>
                </div>

                <div>
                    <div className="text-[50px] text-white font-bolds">Tìm sự khác biệt</div>
                    <img src="" alt="" />
                </div>
                <div className="flex justify-center p-2 items-center rounded-full bg-[#F54923]">
                    <div className="text-[50px] text-white font-bold">Điểm {score}</div>
                </div>

                <div>
                    <img src="" alt="" />
                    <div className="text-[50px] text-white font-bolds">{formatCountDown(time)}</div>
                </div>
                <div
                    onClick={() => handleSuggest()}
                    className="flex gap-3 justify-center items-center rounded-2xl px-5 bg-[#4285f4] cursor-pointer"
                >
                    <img src={assets.svg.suggest} alt="" />
                    <div className="text-white font-boid text-[50px]">Gợi ý ({suggestQuantity})</div>
                </div>
            </div>
            <div className="flex relative justify-center items-center w-full h-full">{renderImage()}</div>
        </div>
    );
}

export default GamePage;
