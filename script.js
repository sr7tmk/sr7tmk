const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");

button.addEventListener("click", () => {
  const q = input.value.trim();
  if (q) {
    document.getElementById("documents").scrollIntoView({behavior:"smooth"});
  }
});
input.addEventListener("keydown", e => {
  if (e.key === "Enter") button.click();
});