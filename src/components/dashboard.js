// components/Dashboard.js

import React from 'react';

const Dashboard = () => {
  // Example data for the dashboard
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Admin',
  };

  const project = {
    name: 'My Project',
    description: 'A web application for managing tasks',
    status: 'In Progress',
  };

  const tasks = [
    { id: 1, title: 'Task 1', status: 'Completed' },
    { id: 2, title: 'Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', status: 'Pending' },
  ];

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <h3>Project: {project.name}</h3>
      <p>Description: {project.description}</p>
      <p>Status: {project.status}</p>

      <h3>Tasks:</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;