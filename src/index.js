// src/index.js
async function generateContent() {
  const query = document.getElementById('query').value;
  const responseContainer = document.getElementById('resultText');

  try {
    const response = await fetch('/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.text();

    // Clear existing content
    responseContainer.textContent = '';

    // Simulate typing animation
    for (let i = 0; i < result.length; i++) {
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result[i];
    }
    audio.play();

  } catch (error) {
    console.error('Error:', error);
    responseContainer.textContent = 'Developer is Too Lazy to resolve bugs';
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
