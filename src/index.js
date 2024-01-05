// src/index.js
document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  console.log(window.location.search);
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("query")) {
    const encodedQuery = urlParams.get("query");

    // Decode the query parameter
    const decodedQuery = atob(encodedQuery);

    console.log(decodedQuery);

    // Set the decoded value to the 'query' input field
    document.getElementById("query").value = decodedQuery;
  }
});
// index.js
const button = document.getElementsByClassName("checkButton");

async function generateContent() {
  if (button.disabled === true) {
    return;
  }

  button.disabled = true;
  const query = document.getElementById("query").value;
  const responseContainer = document.getElementById("resultText");
  const loadingAnimationContainer = document.getElementById("loadingAnimation");

  //If NO input Provoided
  if (query.length === 0) {
    responseContainer.textContent = `Enter a query kiddo`;

    return;
  }

  //if input contain thala/dhoni
  if (
    query.toLowerCase().includes("thala") ||
    query.toLowerCase().includes("dhoni")
  ) {
    result_preset = `Truly Thala For A Reason`;
    responseContainer.textContent = result_preset[0];

    for (let i = 1; i < result_preset.length; i++) {
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result_preset[i];
    }

    audio.play();
    button.disabled = false;

    return;
  }

  let temp = "";
  //to check give input is number or digit
  if (!isNaN(query)) {
    temp = "Digits";
  } else {
    temp = "letters";
  }

  //input has 7letters/digits in it
  if (query.length === 7) {
    let result_preset = `${query} has exactly 7 ${temp}! Thala Confirmed`;
    responseContainer.textContent = result_preset[0];
    for (let i = 1; i < result_preset.length; i++) {
      //button.disabled = true;
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result_preset[i];
    }

    audio.play();
    button.disabled = false;

    return;
  }

  //input has letters/digits multiple of 7
  if (query.length % 7 == 0) {
    let result_preset = `${query} has exactly Multiple of 7 ${temp}! Thala Confirmed`;
    responseContainer.textContent = result_preset[0];
    for (let i = 1; i < result_preset.length; i++) {
      //button.disabled = true;
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result_preset[i];
    }

    audio.play();
    button.disabled = false;
    return;
  }

  // if input is number and its sum is multiple of 7
  if (query >= 10 && temp === "Digits") {
    var steps = [];
    var temp1 = query;
    //this while loop is used to find the sum of digits of number
    while (temp1 >= 10) {
      var digits = temp1.toString().split("").map(Number);
      var sum = digits.reduce((a, b) => a + b, 0);
      steps.push(digits.join(" + ") + " = " + sum);
      temp1 = sum;
      // at any moment of sum is multiple of 7 , then it stop 
      if (sum % 7 == 0) {
        break;
      }
    }
    steps.push(
      `${query} has sum exactly Multiple of 7 ${temp}! Thala Confirmed`
    );
    // if sum is multiple of 7
    if (sum % 7 == 0) {
      let tempv =
        "<p>Steps:</p>\n<ul><li>" + steps.join("</li>\n<li>") + "</li></ul>";
      // here we create new element so that in this element we can store the html and later on we can retreive the text from it  
      var tempElement = document.createElement("div");
      tempElement.innerHTML = tempv;
      let result_preset = tempElement.innerText;
      // we use array bcz , the text giving output in one line. Now it will give proper output
      let lines = result_preset.split('\n'); // Split the text into an array of lines
      responseContainer.innerHTML = lines[0];
      
      for (let i = 1; i < lines.length; i++) {
          responseContainer.innerHTML += '<br>'; // Add a line break for each new line
          let line = lines[i];
      
          for (let j = 0; j < line.length; j++) {
              // button.disabled = true;
              await sleep(30); // Adjust the typing speed (milliseconds)
              responseContainer.innerHTML += line[j];
          }
      }

      audio.play();
      button.disabled = false;
      return;
    }
  }  


  // if input is text and its sum is multiple of 7
  if (query.length >= 10 && temp === "letters") {
    console.log(query);
    var letterCount = query.replace(/[^a-zA-Z]/g, "").length;
    console.log(letterCount);
    var steps = [];
    var temp1 = letterCount;
    //this while loop is used to find the sum of digits of number
    while (temp1 >= 10) {
      var digits = temp1.toString().split("").map(Number);
      var sum = digits.reduce((a, b) => a + b, 0);
      steps.push(digits.join(" + ") + " = " + sum);
      temp1 = sum;
      // at any moment of sum is multiple of 7 , then it stop 
      if (sum % 7 == 0) {
        break;
      }
    }
    console.log(sum);
    steps.push(
      `${query} has sum of letters exactly Multiple of 7 ${temp}! Thala Confirmed`
    );
    // if sum is multiple of 7
    if (sum % 7 == 0) {
      let tempv =
        "<p>Steps:</p>\n"+"Lettercount = "+letterCount+"\n"+"<ul><li>" + steps.join("</li>\n<li>") + "</li></ul>";
      // here we create new element so that in this element we can store the html and later on we can retreive the text from it  
      console.log(tempv)
      var tempElement = document.createElement("div");
      tempElement.innerHTML = tempv;
      let result_preset = tempElement.innerText;
      // we use array bcz , the text giving output in one line. Now it will give proper output
      let lines = result_preset.split('\n'); // Split the text into an array of lines
      responseContainer.innerHTML = lines[0];
      
      for (let i = 1; i < lines.length; i++) {
          responseContainer.innerHTML += '<br>'; // Add a line break for each new line
          let line = lines[i];
      
          for (let j = 0; j < line.length; j++) {
              // button.disabled = true;
              await sleep(30); // Adjust the typing speed (milliseconds)
              responseContainer.innerHTML += line[j];
          }
      }

      audio.play();
      button.disabled = false;
      return;
    }
  }  

  loadingAnimationContainer.style.height = "100px";
  // Display loading animation
  const animation = lottie.loadAnimation({
    container: loadingAnimationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "Animation.json", // Replace with the path to your animation JSON file
  });

  try {
    const response = await fetch("/userdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    // Clear existing content
    responseContainer.textContent = "";
    loadingAnimationContainer.style.display = "none"; // Hide loading animation

    const result = await response.text();

    // Simulate typing animation
    for (let i = 0; i < result.length; i++) {
      // button.disabled = true;
      await sleep(30); // Adjust the typing speed (milliseconds)
      responseContainer.textContent += result[i];
    }

    audio.play();
    button.disabled = false;
  } catch (error) {
    console.error("Error:", error);
    responseContainer.textContent = "Developer is Too Lazy to resolve bugs";
    loadingAnimationContainer.style.display = "none"; // Hide loading animation
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// index.js
async function shareOnTwitter() {
  const resultContainer = document.getElementById("resultContainer");
  const queryValue = document.getElementById("query").value;
  let urlWithQuery = `${window.location.origin}/`;

  const encodedQuery = btoa(queryValue);
  if (queryValue !== "") {
    urlWithQuery = `${window.location.origin}/?query=${encodedQuery}`;
  }

  try {
    // Set up Twitter sharing link
    const tweetText = encodeURIComponent(
      `Check if you're a Thala!🕵️\nVisit: ${urlWithQuery}\n#ThalaForReason`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    // Open Twitter sharing window
    window.open(tweetUrl, "_blank");
  } catch (error) {
    console.error("Error:", error);
    alert("Error sharing on Twitter");
  }
}

async function shareOnWhatsApp() {
  const resultContainer = document.getElementById("resultContainer");
  const queryValue = document.getElementById("query").value;
  let urlWithQuery = `${window.location.origin}/`;

  const encodedQuery = btoa(queryValue);
  if (queryValue !== "") {
    urlWithQuery = `${window.location.origin}/?query=${encodedQuery}`;
  }

  try {
    const whatsAppText = encodeURIComponent(
      `Check if you're a Thala!🕵️\nVisit: ${urlWithQuery}`
    );
    const whatsappLink = `https://wa.me/?text=${whatsAppText}`;

    // Open Twitter sharing window
    window.open(whatsappLink, "_blank");
  } catch (error) {
    console.error("Error:", error);
    alert("Error sharing on Twitter");
  }
}

async function shareOnOthers() {
  document.documentElement.style.backgroundColor = "rgba(255,42,102,255)";
  document.body.style.backgroundColor = "rgba(255,42,102,255)";
  const mainContainer = document.querySelector(".main-container");

  // Make the background of the main container transparent
  mainContainer.style.backgroundColor = "rgba(255,42,102,255)";

  const canvas = await html2canvas(mainContainer);

  // Convert canvas data to data URI
  const dataURL = canvas.toDataURL();

  // Reset the background color of the main container
  mainContainer.style.backgroundColor = ""; // Set it to whatever color or style you had before

  // Create a Blob from the data URL
  const blob = dataURItoBlob(dataURL);

  // Check if the Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Share on Others",
        files: [new File([blob], "result_image.png", { type: "image/png" })],
      });
    } catch (error) {}
  } else {
    alert("Web Share API is not supported on this browser.");
  }
}

// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}

function copyToClipboard() {
  const toast = document.getElementById("toast");
  const queryValue = document.getElementById("query").value;
  let urlWithQuery = `${window.location.origin}/`;

  const encodedQuery = btoa(queryValue);
  if (queryValue !== "") {
    urlWithQuery = `${window.location.origin}/?query=${encodedQuery}`;
  }

  // Use the Clipboard API to copy the text
  navigator.clipboard
    .writeText(urlWithQuery)
    .then(() => {
      toast.classList.remove("hiddenToast");
      toast.classList.add("showToast");
      setTimeout(() => {
        toast.classList.remove("showToast");
        toast.classList.add("hiddenToast");
      }, 2000);
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });
}

// Eye animation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("body").addEventListener("mousemove", eyeball);

  function eyeball() {
    var eye = document.querySelectorAll(".eye");
    eye.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rot = radian * (180 / Math.PI) * -1 + 270;
      eye.style.transform = "rotate(" + rot + "deg)";
    });
  }
});
