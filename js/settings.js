const API_URL = import.meta.env.VITE_API_URL;

let userId = null;

document.addEventListener("DOMContentLoaded", () => {
  verificarToken();

  const token =
    localStorage.getItem("token_pontopro_users") ||
    sessionStorage.getItem("token_pontopro_users");

  if (token) {
    userId = getUserIdFromToken(token); // pega id do payload
  }

  // Ativa o botão de logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token_pontopro_users");
      sessionStorage.removeItem("token_pontopro_users");
      window.location.href = "index.html";
    });
  }

  // Carregar foto ao abrir a página
  if (userId) {
    loadUserPhoto();
  }

  loadUserData(userId, token);
});

const avatarInitials = document.getElementById("avatarInitials");
const avatarImage = document.getElementById("avatarImage");
const photoInput = document.getElementById("photoInput");

// Função para buscar foto no backend
async function loadUserPhoto() {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/photo`);

    if (response.ok) {
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      avatarImage.src = imageUrl;
      avatarImage.style.display = "block";
      avatarInitials.style.display = "none";
    } else {
      // Se não tiver foto, mostra iniciais
      avatarImage.style.display = "none";
      avatarInitials.style.display = "block";
    }
  } catch (err) {
    console.error("Erro ao carregar foto:", err);
    avatarImage.style.display = "none";
    avatarInitials.style.display = "block";
  }
}

// Função para enviar foto nova
photoInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/photo`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      avatarImage.src = data.photo; // já vem como base64
      avatarImage.style.display = "block";
      avatarInitials.style.display = "none";
    } else {
      alert("Erro ao enviar foto");
    }
  } catch (err) {
    console.error("Erro ao enviar foto:", err);
  }
});

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

    // Envia uma requisição para o backend para verificar se o token ainda é válido
    const response = await fetch(`${API_URL}/users/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Token inválido ou expirado
      localStorage.removeItem("token_pontopro_users");
      window.location.href = "index.html";
    }

    // Aqui o token é válido e pode continuar usando a página
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading").style.display = "none";
  }
}

function getUserIdFromToken(token) {
  try {
    const payloadBase64 = token.split(".")[1]; // pega a parte do meio do JWT
    const payload = JSON.parse(atob(payloadBase64)); // decodifica Base64 e transforma em JSON
    return payload.id; // porque no backend você colocou { id: user._id }
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
}

async function loadUserData(userId, token) {
  try {
    const response = await fetch(
      `${API_URL}/users/getUserById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Erro ao buscar usuário");

    const user = await response.json();

    // Preencher os inputs do formulário
    document.getElementById("userNome").value = user.name || "";
    document.getElementById("userEmail").value = user.email || "";
    document.getElementById("userPhone").value = user.phone || "";
    document.getElementById("userRole").value = user.position || "";
  } catch (err) {
    console.error("Erro ao carregar dados do usuário:", err);
  }
}
