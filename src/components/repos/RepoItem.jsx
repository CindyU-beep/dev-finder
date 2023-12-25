import React from 'react';
import PropTypes from 'prop-types';
import { FaLink, FaEye, FaStar, FaInfo, FaUtensils } from 'react-icons/fa';

function RepoItem({ repo }) {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
  } = repo;
  return (
    <a
      href={html_url}
      className="mb-2 rounded-md card bg-gray-100 hover:bg-gray-300"
    >
      <div className="card-body">
        <h3 className="mb-2 text-xl font-semibold">
          <FaLink className="inline mr-4" />
          {name}
        </h3>
        <p className="mb-3">{description}</p>
        <div>
          <div className="mr-2 badge badge-outline badge-lg">
            <FaEye className="mr-4" />
            {watchers_count}
          </div>
          <div className="mr-2 badge badge-outline badge-lg">
            <FaStar className="mr-4" />
            {stargazers_count}
          </div>
          <div className="mr-2 badge badge-outline badge-lg">
            <FaInfo className="mr-4" />
            {open_issues}
          </div>
          <div className="mr-2 badge badge-outline badge-lg">
            <FaUtensils className="mr-4" />
            {forks}
          </div>
        </div>
      </div>
    </a>
  );
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};
export default RepoItem;
