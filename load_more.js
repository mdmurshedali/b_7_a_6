const toolsContainer = document.getElementById("tools-container");

const spinner = `
<div class="d-flex align-items-center justify-content-center text-center">
  <strong class="text-center">Loading...</strong>
  <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
</div>
`;
toolsContainer.innerHTML = spinner;

const loadMoreButton = document.getElementById("load-more-button");
let currentCardIndex = 6;
// let allCardsLoaded = false;

fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(response => response.json())
  .then(data => {
    const tools = data.data.tools;

    function renderData(tools) {
      toolsContainer.innerHTML = "";

      for (let i = 0; i < currentCardIndex; i++) {
        const tool = tools[i];
        const toolElement = document.createElement("div");
        toolElement.classList.add("card");
        toolElement.innerHTML = `
          <div class="card-img-top p-3">
            <img src="${tool.image}" class="rounded w-100" alt="...">
          </div>
          <div class="card-body">
            <h2 class="card-title b">Features</h2>
            <p class="card-text">1.  ${tool.features[0]} </p>
            <p class="card-text">2.  ${tool.features[1]}</p>
            <p class="card-text">3.  ${tool.features[2]}</p>
            <hr>
            <div  class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="card-title b">${tool.name}</h2>
                <p class="card-text d-flex justify-content-center align-items-center"> <span><img src="./Frame.png" alt=""></span> <span>${tool.published_in}</span></p>            
              </div>
              <div>
                <a href="#" class="rounded-circle arrow_button_bg">→</a>
              </div>          
            </div>
          </div>
        `;
        toolsContainer.appendChild(toolElement);
      }

      if (currentCardIndex >= tools.length) {
        // allCardsLoaded = true;
        loadMoreButton.style.display = "none";
      }
    }

    renderData(tools);

    const sortBtn = document.getElementById("sort-btn");
    sortBtn.addEventListener("click", function () {
      const sortedData = tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
      renderData(sortedData);
    });

    loadMoreButton.addEventListener("click", function () {
      currentCardIndex += 6;
      renderData(tools);
    });
  })
  .catch(error => console.error(error));
