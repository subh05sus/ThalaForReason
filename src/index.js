// src/index.js
document.addEventListener('DOMContentLoaded', function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has('query')) {
    const encodedQuery = urlParams.get('query');
    
    // Decode the query parameter
    const decodedQuery = atob(encodedQuery);

    console.log(decodedQuery);
    
    // Set the decoded value to the 'query' input field
    document.getElementById('query').value = decodedQuery;
  }

});  
// index.js
async function generateContent() {
  const query = document.getElementById('query').value;
  const responseContainer = document.getElementById('resultText');
  const loadingAnimationContainer = document.getElementById('loadingAnimation');
  loadingAnimationContainer.style.height = "100px"

  if (query.length === 0) {
    responseContainer.textContent = `Enter a query kiddo`;

    return; // Exit the function early
  }
  if (query.length === 7) {
    responseContainer.textContent = `${query} has exactly 7 letters! Thala Confirmed`;
    audio.play();
    return; // Exit the function early
  }

  // Display loading animation
  const animation = lottie.loadAnimation({
    container: loadingAnimationContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'Animation.json', // Replace with the path to your animation JSON file
  });

  try {
    const response = await fetch('/userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    // Clear existing content
    responseContainer.textContent = '';
    loadingAnimationContainer.style.display = 'none'; // Hide loading animation

    const result = await response.text();

    // Simulate typing animation
    for (let i = 0; i < result.length; i++) {
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result[i];
    }
    audio.play();

  } catch (error) {
    console.error('Error:', error);
    responseContainer.textContent = 'Developer is Too Lazy to resolve bugs';
    loadingAnimationContainer.style.display = 'none'; // Hide loading animation
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




// index.js
async function shareOnTwitter() {
  const resultContainer = document.getElementById('resultContainer');
  const queryValue = document.getElementById('query').value;
  const encodedQuery = btoa(queryValue);
  const urlWithQuery = `http://localhost:8080/?query=${encodedQuery}`;
  console.log(urlWithQuery);

  try {
    const canvas = await html2canvas(resultContainer);
    console.log(canvas)
    
    // Convert canvas data to data URI
    const dataURL = canvas.toDataURL();
    // console.log(dataURL)
    
    // Encode data URI for Twitter
    const encodedData = encodeURIComponent(dataURL);
  const query = document.getElementById('query').value;

    // Set up Twitter sharing link
    const tweetText = encodeURIComponent(`Check if you're a Thala!🕵️\nVisit: ${urlWithQuery}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    // Open Twitter sharing window
    window.open(tweetUrl, '_blank');
  } catch (error) {
    console.error('Error:', error);
    alert('Error sharing on Twitter');
  }
}



async function shareOnWhatsApp() {
  const resultContainer = document.getElementById('resultContainer');
  const queryValue = document.getElementById('query').value;
  const encodedQuery = btoa(queryValue);
  const urlWithQuery = `http://localhost:8080/?query=${encodedQuery}`;
  console.log(urlWithQuery);

  try {

    const whatsAppText = encodeURIComponent(`Check if you're a Thala!🕵️\nVisit: ${urlWithQuery}`);
    const whatsappLink = `https://wa.me/?text=${whatsAppText}`;

    // Open Twitter sharing window
    window.open(whatsappLink, '_blank');
  } catch (error) {
    console.error('Error:', error);
    alert('Error sharing on Twitter');
  }
}


// index.js
// index.js
async function shareOnOthers() {
  document.documentElement.style.backgroundColor = 'rgba(255,42,102,255)';
  document.body.style.backgroundColor = 'rgba(255,42,102,255)';
  const mainContainer = document.querySelector('.main-container');

  // Make the background of the main container transparent
  mainContainer.style.backgroundColor = 'rgba(255,42,102,255)';

  const canvas = await html2canvas(mainContainer);

  // Convert canvas data to data URI
  const dataURL = canvas.toDataURL();

  // Reset the background color of the main container
  mainContainer.style.backgroundColor = ''; // Set it to whatever color or style you had before

  // Create a Blob from the data URL
  const blob = dataURItoBlob(dataURL);

  // Check if the Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Share on Others',
        files: [new File([blob], 'result_image.png', { type: 'image/png' })],
      });
    } catch (error) {
      
    }
  } else {
    alert('Web Share API is not supported on this browser.');
  }
}


// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
}

// ... existing code ...
