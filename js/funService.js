const URL = import.meta.env.VITE_API_URL;

document.getElementById("saveEdit").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("editEmail").value;
  const name = document.getElementById("editName").value;
  const cpf = document.getElementById("editCpf").value;
  const address = document.getElementById("editEndereco").value;
  const phone = document.getElementById("editPhone").value;
  const position = document.getElementById("editPosition").value;
  const department = document.getElementById("editDepartament").value;
  const workTime = document.getElementById("editWorkTime").valu;
  const status = document.getElementById("editStatus").value;
  const salary = document.getElementById("editSalary").value;

  try {
    const response = await fetch(`${URL}/users/updateUserById/${user}`)
  } catch (error) {
    
  }
});
