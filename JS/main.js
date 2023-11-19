
// const getImage = async () => {
//   console.log("clicked");
//   const methods = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       prompt: input.value, // Assuming input is an HTML input element
//       n: 3,
//       size: "512x512",
//     }),
//   };
//   const res = await fetch(apiUrl, methods);
//   const data = await res.json();
//   const imagesList = data.data;
//   images.innerHTML = "";
//   imagesList.map((photo) => {
//     const div = document.createElement("div");
//     images.appendChild(div);
//     const img = document.createElement("img");
//     div.appendChild(img);
//     img.src = photo.url;
//   });
// };

let images = document.querySelector(".images");
const input = document.querySelector("input");
let imgs = document.querySelector(".images div img");
const loadingScreen = document.querySelectorAll(".loading-screen");
const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/images/generations";

const getImage = async () => {
  // Show loading screen
  loadingScreen.forEach((div) => {
    div.classList.add("active");
  });

  console.log("clicked");
  const methods = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: input.value,
      n: 3,
      size: "512x512",
    }),
  };
  try {
    const res = await fetch(apiUrl, methods);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    const imagesList = data.data;
    images.innerHTML = "";
    imagesList.forEach((photo) => {
      const div = document.createElement("div");
      images.appendChild(div);
      const img = document.createElement("img");
      div.appendChild(img);
      img.src = photo.url;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error, e.g., display an error message to the user
  } finally {
    // Hide loading screen whether the request is successful or not
    loadingScreen.forEach((div) => {
      div.classList.remove("active");
    });
  }
};
// Assuming you have a button that triggers the getImage function
const button = document.querySelector("#generateButton");
button.addEventListener("click", getImage);
