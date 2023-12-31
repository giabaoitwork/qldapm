import { useEffect, useState } from 'react';
import assets from '../assets';

function GamePage() {
    const [currentRound, setCurrentRouund] = useState(1);
    const [countDown, setCountDown] = useState(600);
    const [rowsAndCols, setRowsAndCols] = useState([10, 7]);
    const [differentIndex, setDifferentIndex] = useState(Math.floor(Math.random() * rowsAndCols[0] * rowsAndCols[1]));
    const [suggestQuantity, setSuggestQuantity] = useState(3);
    const formatCountDown = (countDown) => {
        const minutes = Math.floor(countDown / 60);
        const remainingSeconds = countDown % 60;

        const formattedTime = `${minutes > 0 ? `${minutes}p` : ''}${remainingSeconds}s`;

        return formattedTime;
    };

    const handleSelect = (element, bool) => {
        console.log(element);
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
        }
        if (!bool) {
            element.classList.add('shake');
            setTimeout(() => element.classList.remove('shake'), 500);
        }
    };

    const handleSuggset = () => {
        if (suggestQuantity <= 0) return;
        const imgElement = document.getElementById('wapper-game').querySelector(`div:nth-child(${differentIndex + 1})`);
        imgElement.classList.add('border-[2px]', 'border-[red]');
        setSuggestQuantity((prev) => prev - 1);
    };

    const renderImage = () => {
        const elements = [];
        for (let i = 0; i < rowsAndCols[0] * rowsAndCols[1]; i++) {
            console.log(i, differentIndex);
            console.log(i === differentIndex);
            if (i === differentIndex) {
                elements.push(
                    <div key={i} onClick={(e) => handleSelect(e.curentTarger, true)} className="w-[90px] h-[90px]">
                        <img className="w-full h-full" src={assets.images.cowFalse} alt="" />
                    </div>,
                );
            } else {
                elements.push(
                    <div key={i} onClick={(e) => handleSelect(e.currentTarget, false)} className="w-[90px] h-[90px]">
                        <img className="w-full h-full" src={assets.images.cowTrue} alt="" />
                    </div>,
                );
            }
        }
        const gridContainerStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(' + rowsAndCols[0] + ', minmax(0, 1fr))',
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
        const timer = setInterval(() => {
            setCountDown((prev) => {
                if (prev > 0) return prev - 1;
                else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 1000);
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-around items-center p-5 w-full bg-[#8EF924] h-[100px]">
                <div className="flex justify-center p-2 items-center rounded-full bg-[#F54923]">
                    <div className="text-[50px] text-white font-bold">Đề {currentRound}:</div>
                </div>
                <div>
                    <div className="text-[50px] text-white font-bolds">Tìm sự khác biệt</div>
                    <img src="" alt="" />
                </div>
                <div>
                    <img src="" alt="" />
                    <div className="text-[50px] text-white font-bolds">{formatCountDown(countDown)}</div>
                </div>
            </div>
            <div className="flex relative justify-center items-center w-full h-full">
                {renderImage()}
                <div
                    onClick={() => handleSuggset()}
                    className="flex gap-3 justify-center items-center rounded-2xl px-5 absolute bottom-3 right-3 bg-[#4285f4] cursor-pointer"
                >
                    <img src={assets.svg.suggest} alt="" />
                    <div className="text-white font-boid text-[50px]">Gợi ý ({suggestQuantity})</div>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
