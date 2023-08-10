import React from "react";

const WebProject = ({ project, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(project.id);
  };

  const handleEdit = () => {
    onEdit(project);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <a href={project.URL} className="card-link">
          {project.URL}
        </a>
        <button className="btn btn-danger ms-2" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-primary ms-2" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default WebProject;
