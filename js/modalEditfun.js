// Seletores
const editModal = document.getElementById("editModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const editForm = document.getElementById("editForm");

// Função para abrir modal e preencher com dados do usuário
function openEditModal() {
  //   document.getElementById("editId").value = user._id;
  //   document.getElementById("editName").value = user.name;
  //   document.getElementById("editEmail").value = user.email;
  //   document.getElementById("editPosition").value = user.position;
  //   document.getElementById("editDepartment").value = user.department;
  //   document.getElementById("editPhone").value = user.phone;
  //   document.getElementById("editStatus").value = user.status;

  editModal.classList.remove("hidden");
}

// Fechar modal
closeModalBtn.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

// // Submeter edição
// editForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const id = document.getElementById("editId").value;
//   const updatedUser = {
//     name: document.getElementById("editName").value,
//     email: document.getElementById("editEmail").value,
//     position: document.getElementById("editPosition").value,
//     department: document.getElementById("editDepartment").value,
//     phone: document.getElementById("editPhone").value,
//     status: document.getElementById("editStatus").value,
//   };

//   try {
//     const response = await fetch(`${URL}/users/update/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedUser),
//     });

//     if (response.ok) {
//       alert("Usuário atualizado com sucesso!");
//       location.reload();
//     } else {
//       const errorData = await response.json();
//       alert("Erro ao atualizar: " + (errorData.erro || "Erro desconhecido"));
//     }
//   } catch (error) {
//     console.error("Erro:", error);
//     alert("Erro ao conectar com o servidor");
//   }
// });

// // Vincular botões de edição da tabela
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("edit-btn")) {
//     const tr = e.target.closest("tr");
//     const email = tr.querySelector(".employee-info-table p").textContent;

//     // Pegar usuário pelo email (ou pelo _id no seu loop)
//     fetch(`${URL}/users/getAll`)
//       .then((res) => res.json())
//       .then((users) => {
//         const user = users.find((u) => u.email === email);
//         if (user) openEditModal(user);
//       });
//   }
// });

export default openEditModal;
