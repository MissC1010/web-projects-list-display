import React, { useState, useEffect } from "react";
import WebProjectForm from "./WebProjectForm";
import WebProjectList from "./WebProjectList";
import axios from "axios";
import "./App.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api").then((response) => {
      setProjects(response.data);
    });
  }, []);

  const addProject = (project) => {
    axios.post("http://localhost:8080/api", project).then((response) => {
      axios.get("http://localhost:8080/api").then((response) => {
        setProjects(response.data);
      });
    });
  };

  const deleteProject = (projectId) => {
    const projectToDelete = projects.find(
      (project) => project.id === projectId
    );
    if (projectToDelete) {
      axios.delete(`http://localhost:8080/api/${projectId}`).then(() => {
        axios.get("http://localhost:8080/api").then((response) => {
          setProjects(response.data);
        });
      });
    } else {
      console.log(`Project with ID ${projectId} not found`);
    }
  };

  const updateProject = (project) => {
    const projectToUpdate = projects.find((p) => p.id === project.id);
    if (projectToUpdate) {
      axios.put(`http://localhost:8080/api/${project.id}`, project).then(() => {
        axios.get("http://localhost:8080/api").then((response) => {
          setProjects(response.data);
          setEditingProject(null); // Reset editingProject after update
        });
      });
    } else {
      console.log(`Project with ID ${project.id} not found`);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCancel = () => {
    setEditingProject(null);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Web Projects</h1>
      <div className="row">
        <div className="col-md-6">
          <WebProjectForm
            onSubmit={editingProject ? updateProject : addProject}
            onCancel={handleCancel}
            project={editingProject}
          />
        </div>
        <div className="col-md-6">
          <WebProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={deleteProject}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
