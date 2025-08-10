// Future animations and interactive effects can go here.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Medical Makers site loaded.");
});

const bios = {
  nikhil: {
    name: "Nikhil Nayak",
    role: "Co-President",
    text: "Hey guys! My name is Nikhil and I'm a senior at NU this year. I'm in the BS/MS program studying mechanical and electrical engineering, and outside of school I like to listen to new songs, hang out with friends, and spend time outside. Feel free to reach out if you have any questions!",
    image: "images/nik.jpg",
    linkedin: "https://www.linkedin.com/in/n-nayak1/",
    email: "mailto:NikhilNayak2026@u.northwestern.edu"
  },
  nathaniel: {
    name: "Nathaniel Rogers",
    role: "Co-President",
    text: "Hello! I’m Nathaniel, and I’m a junior at NU pursuing a degree in Biomedical Engineering and the Segal Design Certificate. I’m especially interested in medical devices and the design engineering behind them. Extracurricularly, I enjoy playing squash, reading, and long, exploratory walks. Please stop me on a path or send an email/message if you have questions or comments about Medical Makers, BME, or anything else I mentioned above.",
    image: "images/nathaniel_rogers.jpeg",
    linkedin: "https://www.linkedin.com/in/nathaniel-r0gers/",
    email: "mailto:NathanielRogers2027@u.northwestern.edu"
  },
  ryan: {
    name: "Ryan Xu",
    role: "Treasurer",
    text: "Hi my name is Ryan and I’m from the Bay Area! I’m a rising sophomore and am getting my BS in biomedical engineering. In my spare time I love gardening and practicing kung fu. Feel free to reach out!",
    image: "images/ryan_xu.jpeg",
    linkedin: "https://www.linkedin.com/in/ryan-xu-71983032b",
    email: "mailto:RyanXu2028@u.northwestern.edu"
  },
  jackson: {
    name: "Jackson Wang",
    role: "Secretary",
    text: "Hi, my name is Jackson Wang and I’m from Nashville TN. I am a sophomore studying BME and in my free time I like to do photography and go hiking.",
    image: "images/jackson_wang.jpeg",
    linkedin: "https://www.linkedin.com/in/jackson-wang-899a25172",
    email: "mailto:JacksonWang2028@u.northwestern.edu"
  },
  victoria: {
    name: "Victoria Israel",
    role: "Project Manager - MILO",
    text: "[insert bio here]",
    image: "images/victoria_israel.jpeg",
    linkedin: "https://www.linkedin.com/in/victoriaisrael",
    email: "mailto:VictoriaIsrael2026@u.northwestern.edu"
  },
  eva: {
    name: "Eva Potjer",
    role: "Project Manager - SlideBoard",
    text: "[insert bio here]",
    image: "images/eva_potjer.jpeg",
    linkedin: "https://www.linkedin.com/in/eva-potjer-617598252",
    email: "mailto:EvaPotjer2026@u.northwestern.edu"
  },
  meghna: {
    name: "Meghna Sundaram",
    role: "Project Manager - SlideBoard",
    text: "Junior studying Mechanical Engineering. She is specifically interested in design and CAD modeling for robotics and biomedical applications. For fun, she loves to bake, go on long runs and hang out with her friends.",
    image: "images/meghna_sundaram.jpeg",
    linkedin: "https://www.linkedin.com/in/meghna-sundaram-32973b283",
    email: "mailto:MeghnaSundaram2027@u.northwestern.edu"
  },
  travis: {
    name: "Travis Saltzman",
    role: "Project Manager - Team 1",
    text: "[insert bio here]",
    image: "images/travis_saltzman.jpeg",
    linkedin: "https://www.linkedin.com/in/travis-saltzman-9a0b7225a",
    email: "mailto:TravisSaltzman2027@u.northwestern.edu"
  },
  david: {
    name: "David Wong",
    role: "Project Manager - Team 2",
    text: "[insert bio here]",
    image: "images/david_wong.jpeg",
    linkedin: "https://www.linkedin.com/in/david-c-w-nu2027/",
    email: "mailto:DavidWong2027@u.northwestern.edu"
  },
  ella: {
    name: "Ella Meek",
    role: "Project Manager - Team 2",
    text: "Hi, I’m Ella and I’m from South Florida. I’m a Sophomore studying biomedical engineering with an interest in bionic prosthetic limbs. My favorite thing about Medical Makers is that our projects bridge engineering and patient care. Outside of school, I enjoy playing volleyball, hanging out with friends, and trying new places to eat!",
    image: "images/ella_meek.jpeg",
    linkedin: "https://www.linkedin.com/in/ella-meek-64a46631b",
    email: "mailto:EllaMeek2028@u.northwestern.edu"
  },
};

function openBio(key) {
  const bio = bios[key];
  if (!bio) return;

  document.getElementById("bio-pic").style.backgroundImage = `url('${bio.image}')`;

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
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}


function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
  const instruction = document.getElementById("tap-instruction");
  if (instruction) {
    instruction.textContent = isMobileDevice()
      ? "Tap on a profile to learn more."
      : "Click on a profile to learn more.";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const instruction = document.getElementById("tap-instruction-project");
  if (instruction) {
    instruction.textContent = isMobileDevice()
      ? "Tap on a project to learn more."
      : "Click on a project to learn more.";
  }
});





