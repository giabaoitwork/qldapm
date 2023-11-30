import './App.css';
import ReviewPage from './pages/ReviewPage';
import assets from './assets';
import GamePage from './pages/GamePage';
import UserInfoPage from './pages/UserInfoPage';
import RankPage from './pages/RankPage';

function App() {
    return (
        <div className="w-screen h-screen relative">
            <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
            <RankPage />
        </div>
    );
}

export default App;
