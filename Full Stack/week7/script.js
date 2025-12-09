const userBody = document.getElementById("userBody");
const refreshBtn = document.getElementById("refreshBtn");
const loader = document.getElementById("loader");

async function fetchUsers() {
  loader.style.display = "block";
  userBody.innerHTML = "";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
      `;
      userBody.appendChild(row);
    });
  } catch {
    userBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:red;">Failed to load data</td></tr>`;
  } finally {
    loader.style.display = "none";
  }
}

refreshBtn.addEventListener("click", fetchUsers);
window.addEventListener("load", fetchUsers);
