import {
  FaCode,
  FaCodepen,
  FaStore,
  FaUserFriends,
  FaUsers,
} from 'react-icons/fa';
import { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import GithubContext from '../context/github/GithubContext';

function User() {
  const { getUser, user, loading } = useContext(GithubContext);
  const params = useParams();

  useEffect(() => {
    getUser(params.login);
    // getUserRepos(params.login);
  }, []); //[] arg ensures it only runs once

  //user object
  const {
    name,
    type,
    login,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto lg:w-10/12 ">
      <div className="mb-4">
        <Link to="/" className="btn btn-ghost">
          BACK TO SEARCH
        </Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
        <div className=" avatar pb-4 px-2">
          <div className="w-13 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={avatar_url} alt="Avatar" />
          </div>
        </div>
        <div className="col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl card-title">
              {name}
              <div className="ml-2 mr-1 badge badge-success">{type}</div>
              {hireable ? (
                <div className="mx-1 badge badge-info">Hireable</div>
              ) : (
                <div className="mx-1 badge badge-info">
                  Not Looking For Work
                </div>
              )}
            </h1>
            {bio ? <p>{bio}</p> : <p>No bio available</p>}
            <div className="mt-4 card-actions">
              <a
                href={html_url}
                target="_blank"
                className="btn btn-outline"
                rel="noreferrer"
              >
                View Github Profile
              </a>
            </div>
          </div>
          <div className="w-full rounded-lg shadow-md bg-base-100 stats">
            {location && (
              <div className="stat">
                <div className="stat-title text-md">Location</div>
                {/* TODO: Add location flag icon */}
                <div className="text-lg stat-value">{location}</div>
              </div>
            )}
            <div className="stat">
              <div className="stat-title text-md">Website</div>
              <div className="text-lg stat-value">
                {blog ? (
                  <a href={`https://${blog}`} target="_blank" rel="noreferrer">
                    {blog}
                  </a>
                ) : (
                  <>No Website</>
                )}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Twitter Handle</div>
              <div className="text-lg stat-value">
                {twitter_username ? (
                  <a
                    href={`https://twitter.com/${twitter_username}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {twitter_username}
                  </a>
                ) : (
                  <>No Twitter</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
        <div className="stat">
          <div className="stat-figure">
            <FaUsers className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Followers</div>
          <div className="stat-value pr-5 text-3xl md:text-4xl">
            {followers}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure">
            <FaUserFriends className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Following</div>
          <div className="stat-value pr-5 text-3xl md:text-4xl">
            {following}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure">
            <FaCodepen className="text-3xl md:text-5xl" />
          </div>
          <div className="stat-title pr-5">Public Repos</div>
          <div className="stat-value pr-5 text-3xl md:text-4xl text-center">
            {followers}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
