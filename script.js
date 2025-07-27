// Future animations and interactive effects can go here.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Medical Makers site loaded.");
});

const bios = {
  nikhil: {
    name: "Nikhil Nayak",
    role: "Co-President",
    text: "What am I doing with my lifeeee",
    linkedin: "https://www.linkedin.com/in/n-nayak1/",
    email: "mailto:NikhilNayak2026@u.northwestern.edu"
  },
  nathaniel: {
    name: "Nathaniel Rogers",
    role: "Co-President",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/nathaniel-r0gers/",
    email: "mailto:NathanielRogers2027@u.northwestern.edu"
  },
  ryan: {
    name: "Ryan Xu",
    role: "Treasurer",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/ryan-xu-71983032b",
    email: "mailto:RyanXu2028@u.northwestern.edu"
  },
  jackson: {
    name: "Jackson Wang",
    role: "Secretary",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/jackson-wang-899a25172",
    email: "mailto:JacksonWang2028@u.northwestern.edu"
  },
  victoria: {
    name: "Victoria Israel",
    role: "Project Manager - MILO",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/victoriaisrael",
    email: "mailto:VictoriaIsrael2026@u.northwestern.edu"
  },
  eva: {
    name: "Eva Potjer",
    role: "Project Manager - Team 1",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/eva-potjer-617598252",
    email: "mailto:EvaPotjer2026@u.northwestern.edu"
  },
  meghna: {
    name: "Meghna Sundaram",
    role: "Project Manager - Team 1",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/meghna-sundaram-32973b283",
    email: "mailto:MeghnaSundaram2027@u.northwestern.edu"
  },
  travis: {
    name: "Travis Saltzman",
    role: "Project Manager - Team 1",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/travis-saltzman-9a0b7225a",
    email: "mailto:TravisSaltzman2027@u.northwestern.edu"
  },
  david: {
    name: "David Wong",
    role: "Project Manager - Team 2",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/david-c-w-nu2027/",
    email: "mailto:DavidWong2027@u.northwestern.edu"
  },
  ella: {
    name: "Ella Meek",
    role: "Project Manager - Team 2",
    text: "[insert bio here]",
    linkedin: "https://www.linkedin.com/in/ella-meek-64a46631b",
    email: "mailto:EllaMeek2028@u.northwestern.edu"
  },
};

function openBio(key) {
  const bio = bios[key];
  if (!bio) return;

  document.getElementById('bio-name').textContent = bio.name;
  document.getElementById('bio-role').textContent = bio.role;
  document.getElementById('bio-text').textContent = bio.text;
  document.getElementById('bio-linkedin').href = bio.linkedin || "#";
  document.getElementById('bio-email').href = bio.email || "#";

  document.getElementById('bio-overlay').style.display = 'block';
  document.getElementById('bio-popup').style.display = 'block';
}

function closeBio() {
  document.getElementById('bio-overlay').style.display = 'none';
  document.getElementById('bio-popup').style.display = 'none';
}

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("show");
}


