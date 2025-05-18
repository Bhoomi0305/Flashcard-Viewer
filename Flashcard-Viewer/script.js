const card = document.getElementById('card');
const flipBtn = document.getElementById('flipBtn');
const knowBtn = document.getElementById('knowBtn');
const dontKnowBtn = document.getElementById('dontKnowBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const toggleTheme = document.getElementById('toggleTheme');

const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Who developed JavaScript?", answer: "Brendan Eich" },
  { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
  { question: "What is the square root of 64?", answer: "8" },
  { question: "What is the boiling point of water?", answer: "100°C or 212°F" }
];

let currentIndex = 0;
let knownCount = 0;
let dontKnowCount = 0;

function updateStatus() {
  document.getElementById('cardNumber').textContent = currentIndex + 1;
  document.getElementById('totalCards').textContent = flashcards.length;
  document.getElementById('knownCount').textContent = knownCount;
  document.getElementById('unknownCount').textContent = dontKnowCount;

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
}

function flashColor(id, color) {
  const el = document.getElementById(id);
  el.style.color = color;
  setTimeout(() => el.style.color = '', 300);
}

function showCard(index) {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');
  front.textContent = flashcards[index].question;
  back.textContent = flashcards[index].answer;
  card.classList.remove('flipped');
  updateStatus();
}

flipBtn.addEventListener('click', () => {
  card.classList.toggle('flipped');
});

knowBtn.addEventListener('click', () => {
  knownCount++;
  updateStatus();
  flashColor('knownCount', 'green');
});

dontKnowBtn.addEventListener('click', () => {
  dontKnowCount++;
  updateStatus();
  flashColor('unknownCount', 'red');
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  showCard(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  showCard(currentIndex);
});

document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === " ") flipBtn.click();
});

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

showCard(currentIndex);
