import React, { useState, useEffect } from "react";

const WebProjectForm = ({ onSubmit, onCancel, project }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [description, setDescription] = useState(
    project ? project.description : ""
  );
  const [URL, setURL] = useState(project ? project.URL : "");

  useEffect(() => {
    setTitle(project ? project.title : "");
    setDescription(project ? project.description : "");
    setURL(project ? project.URL : "");
  }, [project]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = {
      title,
      description,
      URL,
    };
    if (project) {
      newProject.id = project.id;
    }
    onSubmit(newProject);
    setTitle("");
    setDescription("");
    setURL("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setURL("");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="URL" className="form-label">
          URL
        </label>
        <input
          type="text"
          className="form-control"
          id="URL"
          value={URL}
          onChange={(event) => setURL(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        {project ? "Update" : "Add"}
      </button>
      {onCancel && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default WebProjectForm;
