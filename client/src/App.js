import './App.css';
import ReviewPage from './pages/ReviewPage';
import assets from './assets';
import GamePage from './pages/GamePage';
import UserInfoPage from './pages/UserInfoPage';
import RankPage from './pages/RankPage';
import AllReviewPage from './pages/AllReviewPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
function App() {
    return (
        <Router>
            <div className="w-screen h-screen relative">
                <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/userinfo" element={<UserInfoPage />} />
                    <Route path="/rank" element={<RankPage />} />
                    <Route path="/review" element={<ReviewPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
