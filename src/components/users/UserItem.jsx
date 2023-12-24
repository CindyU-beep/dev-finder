import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserItem({ user: { login, avatar_url, followers_url } }) {
  const [followersCount, setFollowersCount] = useState(0);
  //TODO: add followers count to global context
  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(followers_url, {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
        });
        const followers = await response.json();
        setFollowersCount(followers.length);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [followers_url]);

  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex items-center space-x-4 card-body">
        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt="Profile" />
            </div>
          </div>
          <div>
            <h2 className="card-title">{login}</h2>
            <p className="text-base-content text-opacity-40">
              Followers: {followersCount}
            </p>
            <Link
              className="text-base-content text-opacity-40 underline hover:no-underline"
              to={`/user/${login}`}
            >
              Visit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
