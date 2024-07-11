import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Slice/userSlice';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import UserDetail from './components/UserDetail';
import FollowersList from './components/FollowersList';
import FollowerRepositoryList from './components/FollowerRepositoryList';
import './App.css'; // Ensure you have a CSS file for App styling

function App() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const handleSearch = async () => {
    try {
      await dispatch(fetchUser(username));
    } catch (error) {
      console.error('Error fetching user:', error.message);
      // Handle error state or show an alert to the user
    }
  };

  const shouldShowSearchInput = !user; // Only show search input if user is not loaded

  return (
    <Router>
      <div className="app-container">
        <div className="centered-content">
          {shouldShowSearchInput && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
              />
              <button onClick={handleSearch}>Search</button>
            </>
          )}
          {status === 'loading' && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {user && (
            <>
              <Routes>
                <Route path="/" element={<UserDetail user={user} />} />
                <Route path="/followers/:username" element={<FollowersList />} />
                <Route path="/follower-repositories/:followerUsername" element={<FollowerRepositoryList />} />
              </Routes>
              <Link to={`/followers/${user.username}`} className="followers-button">
                View Followers
              </Link>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
