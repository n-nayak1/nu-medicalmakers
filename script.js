// Future animations and interactive effects can go here.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Medical Makers site loaded.");
});

const bios = {
  nikhil: {
    name: "Nikhil Nayak",
    role: "Co-President",
    text: "What am I doing with my lifeeee"
  },
  nathaniel: {
    name: "Nathaniel Rogers",
    role: "Co-President",
    text: "[insert bio here]"
  },
  ryan: {
    name: "Ryan Xu",
    role: "Treasurer",
    text: "[insert bio here]"
  },
  jackson: {
    name: "Jackson Wang",
    role: "Secretary",
    text: "[insert bio here]"
  },
  victoria: {
    name: "Victoria Israel",
    role: "Project Manager - MILO",
    text: "[insert bio here]"
  },
  eva: {
    name: "Eva Potjer",
    role: "Project Manager - Team 1",
    text: "[insert bio here]"
  },
  meghna: {
    name: "Meghna Sundaram",
    role: "Project Manager - Team 1",
    text: "[insert bio here]"
  },
  travis: {
    name: "Travis Saltzman",
    role: "Project Manager - Team 1",
    text: "[insert bio here]"
  },
  david: {
    name: "David Wong",
    role: "Project Manager - Team 2",
    text: "[insert bio here]"
  },
  ella: {
    name: "Ella Meek",
    role: "Project Manager - Team 2",
    text: "[insert bio here]"
  },
};

function openBio(key) {
  const bio = bios[key];
  if (!bio) return;

  document.getElementById('bio-name').textContent = bio.name;
  document.getElementById('bio-role').textContent = bio.role;
  document.getElementById('bio-text').textContent = bio.text;

  document.getElementById('bio-overlay').style.display = 'block';
  document.getElementById('bio-popup').style.display = 'block';
}

function closeBio() {
  document.getElementById('bio-overlay').style.display = 'none';
  document.getElementById('bio-popup').style.display = 'none';
}

