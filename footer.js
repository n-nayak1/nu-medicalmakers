// footer.js
fetch("footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer-container").innerHTML = data;
  })
  .catch(err => console.error("Error loading footer:", err));
