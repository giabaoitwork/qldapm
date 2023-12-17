import './App.css';
import ReviewPage from './pages/ReviewPage';
import assets from './assets';
import GamePage from './pages/GamePage';
import UserInfoPage from './pages/UserInfoPage';
import RankPage from './pages/RankPage';
import AllReviewPage from './pages/AllReviewPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BeginPage from './pages/BeginPage';
import SetUp from './pages/SetUp';
import Table from './pages/Table';
function App() {
    return (
        <Router>
            <div className="w-screen h-screen relative">
                <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/game/:id" element={<GamePage />} />
                    <Route path="/userinfo/:gameId/:time/:score" element={<UserInfoPage />} />
                    <Route path="/rank/:id" element={<RankPage />} />
                    <Route path='/begin' element={<BeginPage />} />
                    <Route path='/setup' element={<SetUp />} />
                    <Route path='/player/:id' element={<Table />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
