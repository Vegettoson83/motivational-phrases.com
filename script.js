const phrases = [
  "You weren’t born to blend in — you were built to break algorithms.",
  "Every day you wake up, the odds reset in your favor.",
  "You're not too much — they're just not enough.",
  "You got rejected? Cool. Build your own damn door.",
  "You don’t need permission when you own the blueprint.",
  "Keep showing up until you’re undeniable.",
  "They’ll talk behind your back — just make sure it echoes.",
  "You’re not lucky, you’re aligned.",
  "The grind isn't optional — it's in your DNA.",
  "Your dreams ain’t crazy. Your fear is just loud."
];

document.getElementById("generateBtn").addEventListener("click", () => {
  const output = document.getElementById("phraseOutput");
  const random = phrases[Math.floor(Math.random() * phrases.length)];
  output.textContent = random;
});
