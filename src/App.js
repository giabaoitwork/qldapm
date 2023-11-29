import './App.css';
import ReviewPage from './pages/ReviewPage';
import assets from './assets';
import GamePage from './pages/GamePage';
import UserInfoPage from './pages/UserInfoPage';

function App() {
    return (
        <div className="w-screen h-screen relative">
            <img className="object-cover w-full h-full absolute -z-[1]" src={assets.images.background} alt="" />
            <UserInfoPage />
        </div>
    );
}

export default App;
