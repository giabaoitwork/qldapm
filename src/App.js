import './App.css';
import ReviewPage from './pages/ReviewPage';
import assets from './assets';
import GamePage from './pages/GamePage';
import UserInfoPage from './pages/UserInfoPage';
import RankPage from './pages/RankPage';
import AllReviewPage from './pages/AllReviewPage';

function App() {
    return (
        <div className="w-screen h-screen relative">
            <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
            <AllReviewPage />
        </div>
    );
}

export default App;
