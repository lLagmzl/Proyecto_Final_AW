import { API_BASE, fetchJson, authHeaders, getToken } from "./api.js";

export async function getProjects() {
  return await fetchJson(`${API_BASE}/projects`, {
    headers: authHeaders()
  });
}

export async function createProject(project) {
  return await fetchJson(`${API_BASE}/projects`, {
    method: "POST",
    headers: { ...authHeaders({ "Content-Type": "application/json" }) },
    body: JSON.stringify(project)
  });
}

export async function updateProject(projectId, updates) {
  return await fetchJson(`${API_BASE}/projects/${projectId}`, {
    method: "PUT",
    headers: { ...authHeaders({ "Content-Type": "application/json" }) },
    body: JSON.stringify(updates)
  });
}

export async function deleteProject(projectId) {
  return await fetchJson(`${API_BASE}/projects/${projectId}`, {
    method: "DELETE",
    headers: authHeaders()
  });
}

export function createProjectCard(project, { onEdit, onDelete }) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.dataset.id = project._id || project.id || "";

  const title = document.createElement("h3");
  title.textContent = project.title;
  card.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = project.description;
  card.appendChild(desc);

  if (project.technologies && project.technologies.length) {
    const tech = document.createElement("p");
    tech.className = "tech";
    tech.textContent = "Tecnologías: " + project.technologies.join(", ");
    card.appendChild(tech);
  }

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.addEventListener("click", () => onEdit(project));
  actions.appendChild(editBtn);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Eliminar";
  delBtn.addEventListener("click", () => onDelete(project));
  actions.appendChild(delBtn);

  card.appendChild(actions);
  return card;
}

export function renderProjectsList(container, projects, callbacks) {
  container.innerHTML = "";
  if (!projects || projects.length === 0) {
    container.innerHTML = "<p>No hay proyectos registrados.</p>";
    return;
  }
  projects.forEach(p => {
    container.appendChild(createProjectCard(p, callbacks));
  });
}