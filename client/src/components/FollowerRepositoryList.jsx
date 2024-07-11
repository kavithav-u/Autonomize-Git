
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FollowerRepositoryList.css'; 

function FollowerRepositoryList() {
  const { followerUsername } = useParams();
  const [repositories, setRepositories] = useState([]);
  const token = import.meta.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${followerUsername}/repos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching repositories:', error.message);
      }
    };

    fetchRepositories();
  }, [followerUsername]);

  return (
    <div className="centered-repositories-container">
      <div className="repositories-container">
        <h3>Repositories of {followerUsername}</h3>
        <div className="repositories-list">
          {repositories.map((repo) => (
            <div key={repo.id} className="repo-item">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                <p>{repo.name}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowerRepositoryList;
