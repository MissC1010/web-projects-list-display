import React from "react";

const WebProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.title}</td>
            <td>{project.description}</td>
            <td>{project.URL}</td>
            <td>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => onEdit(project)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(project.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WebProjectList;
