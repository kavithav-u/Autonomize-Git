
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserDetails.css';

function UserDetail({ user }) {
  const [repos, setRepos] = useState([]);
  const token = process.env.REACT_APP_GITHUB_TOKEN;


  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${user.username}/repos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRepos(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error.message);
      }
    };
    fetchRepos();
  }, [user.username]);

  return (
    <div>
      <div className="centered-container">
        <h2>{user.username}</h2>
        <p className="bio">{user.details.bio}</p>
      </div>
      <div className="user-details-container">
        <div className="user-details-box user-details">
          <div className='user-detail-mini-box'>
            <p>Location: {user.details.location}</p>
            <p>Blog: {user.details.blog}</p>
            <p>Public Repos: {user.details.public_repos}</p>
            <p>Followers: {user.details.followers}</p>
            <p>Following: {user.details.following}</p>
          </div>
          <Link to={`/followers/${user.username}`} className="button-33">View Followers</Link>

        </div>
        <div className="user-avatar-box">
          <img src={user.details.avatar_url} alt={`${user.username}'s avatar`} />
        </div>
      </div>
      <div className="two alt-two">
  <h1>Repositories</h1>
</div>
      <div className="centered-blue-background">
        {repos.map((repo) => (
          <a href={repo.html_url} key={repo.id} className="repo-item" target="_blank" rel="noopener noreferrer">
            <img src={user.details.avatar_url} alt={`${repo.name}'s avatar`} />
            <p>{repo.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default UserDetail;
