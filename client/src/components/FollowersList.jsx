
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./FollowerList.css";

function FollowersList() {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`,
          {
            headers: {
              Authorization: `Bearer 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`,
            },
          }
        );
        const followersData = await Promise.all(
          response.data.map(async (follower) => {
            const followerDetails = await axios.get(
              `https://api.github.com/users/${follower.login}`,
              {
                headers: {
                    Authorization: `Bearer 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`,
                  },
              }
            );
            return {
              id: followerDetails.data.id,
              login: followerDetails.data.login,
              avatar_url: followerDetails.data.avatar_url,
              followers: followerDetails.data.followers,
              public_repos: followerDetails.data.public_repos,
              bio:followerDetails.data.bio
            };
          })
        );
        setFollowers(followersData);
      } catch (error) {
        console.error("Error fetching followers:", error.message);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div className="followers-container">
      <h2 >Followers of {username}</h2>
      <div className="followers-list">
        {followers.map((follower) => (
 <Link
 to={`/follower-repositories/${follower.login}`} // Link to follower's repositories
 key={follower.id}
 className="follower-item"
>
 <img
   src={follower.avatar_url}
   alt={`${follower.login}'s avatar`}
 />
 <div className="info">
   <p>{follower.login}</p>
 </div>
 <p>{follower.bio}</p>
 <div className="counts">
   <p>Followers: {follower.followers}</p>
   <p>Public Repos: {follower.public_repos}</p>
 </div>
</Link>
        ))}
      </div>
    </div>
  );
}

export default FollowersList;
