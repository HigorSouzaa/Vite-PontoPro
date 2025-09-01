const URL = import.meta.env.VITE_API_URL;

function goNewFunScreen() {
  window.location = "/app/newFun.html";
}

// Pega as inicias Joao lima de Souza(J de Joao e S de Souza)
function pegarIniciais(nomeCompleto) {
  const partes = nomeCompleto.trim().split(" ");
  const primeiraLetra = partes[0][0].toUpperCase();
  const ultimaLetra = partes[partes.length - 1][0].toUpperCase();
  return primeiraLetra + ultimaLetra;
}

// Formatar data (de "2023-11-06T00:00:00.000Z" para "06/11/2023")
function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

// Formatar telefone (de "19999999999" para "(19) 99999-9999")
function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

// Formatar CPF (de "00000000000" para "000.000.000-00")
function formatCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

function acordarBackend() {
  const loading = document.querySelector(".loading");
  loading.style.display = "flex";

  fetch(`${URL}/wakeup`)
    .catch((err) => {
      console.error("Erro ao acordar backend:", err);
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

async function verificarToken() {
  const token =
    localStorage.getItem("token_pontopro_users") ||
    sessionStorage.getItem("token_pontopro_users");

  try {
    document.querySelector(".loading").style.display = "flex";
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    const response = await fetch(`${URL}/users/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token_pontopro_users");
      sessionStorage.removeItem("token_pontopro_users");
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading").style.display = "none";
  }
}

async function deleteUser(id) {
  try {
    const response = await fetch(`${URL}/users/deleteById/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Deletado com sucesso");
    } else {
      const errorData = await response.json();
      alert("Erro ao deletar: " + (errorData.erro || "Erro desconhecido"));
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor");
    console.error(error);
  } finally {
    location.reload();
  }
}

function confirmDelete(id) {
  const confirmed = confirm("Tem certeza que deseja deletar este usuário?");
  if (confirmed) {
    deleteUser(id);
  }
}

async function openEditModal(userId) {
  const editModal = document.getElementById("editModal");

  try {
    const responseGetUser = await fetch(`${URL}/users/getUserById/${userId}`);
    const user = await responseGetUser.json();

    sessionStorage.setItem("userId", user._id);
    document.getElementById("editEmail").value = user.email || "";
    document.getElementById("editName").value = user.name || "";
    document.getElementById("editCpf").value = user.cpf || "";
    document.getElementById("editEndereco").value = user.address || "";
    document.getElementById("editPhone").value = user.phone || "";
    document.getElementById("editPosition").value = user.position || "";
    document.getElementById("editDepartament").value = user.department || "";
    document.getElementById("editWorkTime").value = user.workTime || "";
    document.getElementById("editStatus").value = user.status;
    document.getElementById("editSalary").value = user.salary || 0;
  } catch (error) {
    alert("Erro ao buscar informação desse usuario");
  } finally {
    console.log(`Abrindo modal para o usuário com ID: ${userId}`);
    editModal.classList.remove("hidden");
  }
}

function closeEditModal() {
  const editModal = document.getElementById("editModal");
  sessionStorage.removeItem("userId");
  editModal.classList.add("hidden");
}

async function updateUser() {
  const userId = sessionStorage.getItem("userId");

  const updatedUser = {
    email: document.getElementById("editEmail").value,
    name: document.getElementById("editName").value,
    cpf: document.getElementById("editCpf").value,
    address: document.getElementById("editEndereco").value,
    phone: document.getElementById("editPhone").value,
    position: document.getElementById("editPosition").value,
    department: document.getElementById("editDepartament").value,
    workTime: document.getElementById("editWorkTime").value,
    salary: parseFloat(document.getElementById("editSalary").value),
    status: document.getElementById("editStatus").value,
  
  };


  const isManager = updatedUser.department === "RH" ? true : false;

  console.log(isManager);
  
  updatedUser.isManager = isManager;


  console.log(updatedUser.isManager);

  

  try {
    const response = await fetch(`${URL}/users/updateUserById/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      alert("Usuário atualizado com sucesso.");
      closeEditModal();
    } else {
      const errorData = await response.json();
      alert(
        "Erro ao atualizar usuário: " + (errorData.erro || "Erro desconhecido")
      );
    }
  } catch (error) {
    alert("Erro ao conectar com o servidor.");
    console.error(error);
  }
}

document.getElementById("saveEdit").addEventListener("click", updateUser);

document.addEventListener("DOMContentLoaded", async () => {
  acordarBackend();
  verificarToken();

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Remove o token dos dois storages
      localStorage.removeItem("token_pontopro_users");
      sessionStorage.removeItem("token_pontopro_users");

      // Redireciona para a tela de login
      window.location.href = "index.html";
    });
  }

  try {
    const response = await fetch(`${URL}/users/getAll`);
    const users = await response.json();
    console.log(users);
    const tbody = document.getElementById("employeesTableBody");

    tbody.innerHTML = "";

    users.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
            <div class="employee-cell">
                <div class="employee-avatar-table">${pegarIniciais(
                  item.name
                )}</div>
                <div class="employee-info-table">
                    <h4>${item.name}</h4>
                    <p>${item.email}</p>
                </div>
            </div>
        </td>
        <td>${item.position}</td>
        <td>${item.department}</td>
        <td>${formatPhone(item.phone)}</td>
        <td><span class="status-badge ativo">${item.status}</span></td>
        <td>${formatDate(item.admissionDate)}</td>
        <td class="actions-cell">
            <button data-action="edit" data-id="${
              item._id
            }" class="action-btn edit-btn">✏️ Editar</button>
            <button data-action="delete" data-id="${
              item._id
            }" class="action-btn delete-btn">🗑️ Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Adiciona o event listener para os botões da tabela após eles serem criados
    tbody.addEventListener("click", (event) => {
      const target = event.target;
      // Verifica se o clique foi em um botão de ação com o atributo data-action
      if (target.matches('.action-btn[data-action="edit"]')) {
        const userId = target.dataset.id;
        openEditModal(userId);
      } else if (target.matches('.action-btn[data-action="delete"]')) {
        const userId = target.dataset.id;
        confirmDelete(userId);
      }
    });
  } catch (error) {
    console.log(error);
  }

  document
    .getElementById("closeModalBtn")
    .addEventListener("click", closeEditModal);
  document
    .getElementById("cancelEdit")
    .addEventListener("click", closeEditModal);
});
