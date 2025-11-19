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
  const div = document.createElement("div");
  div.classList.add("tarjeta");

  div.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p><strong>Tecnologías:</strong> ${project.technologies?.join(", ")}</p>
      <p><strong>Repositorio:</strong> 
          <a href="${project.repository}" target="_blank">${project.repository}</a>
      </p>

      <div class="botones">
          <button class="btn btn-primary btnEditar"><i class='bx bxs-edit'></i>Editar</button>
          <button class="btn btn-danger btnEliminar"><i class='bx bxs-trash'></i>Eliminar</button>
      </div>
  `;
  div.querySelector(".btnEditar").addEventListener("click", () => onEdit(project));
  div.querySelector(".btnEliminar").addEventListener("click", () => onDelete(project));

  return div;
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