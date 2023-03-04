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

// Fetch the first API to get the list of tools
fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(response => response.json())
  .then(data => {
    const tools = data.data.tools;

    function renderData(tools) {
      toolsContainer.innerHTML = "";

      // Loop through the tools array and extract the id for each tool
      tools.forEach(tool => {
        const toolId = tool.id;

        // Create a new div element for the tool card
        const toolElement = document.createElement("div");
        toolElement.classList.add("card");
        toolElement.innerHTML = `<div class="card-img-top p-3">
            <img src="${tool.image}" class="rounded w-100" alt="...">
          </div>
          <div class="card-body">
            <h2 class="card-title b">Features</h2>
            <ol class="card-text">
              ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
            </ol>
            <hr>
            <div  class="d-flex justify-content-between align-items-center">
              <div>
                <h2 class="card-title b">${tool.name}</h2>
                <p class="card-text d-flex justify-content-center align-items-center"> <span><img src="./Frame.png" alt=""></span> <span>${tool.published_in}</span></p>            
              </div>
              <div>
                
              <a href="#" class="rounded-circle arrow_button_bg" onclick="modal()" data-bs-toggle="modal" data-bs-target="#modalLoad">→</a>

              </div>          
            </div>
          </div>
        `;
        toolsContainer.appendChild(toolElement);

        // Add an onclick event listener to the tool card
        toolElement.addEventListener("click", () => {
          // Fetch the second API using the tool id
          fetch(`https://openapi.programming-hero.com/api/ai/tool/${toolId}`)
            .then(response => response.json())
            .then(data => {
              let modalInfo = data.data;
              const featureNames = Object.values(modalInfo.features).map(obj => obj.feature_name);

              // Update the modal title and body with the fetched data
              let modalTitleText = document.getElementById("modalLoadLabel");
              let modalBodyText = document.getElementById("modal_body_area");
              modalTitleText.innerText = modalInfo.name;
              modalBodyText.innerHTML = `
                
<div class="d-flex justify-content-between align-items-start">


<div class="m-2 w-50">          
  <div class="card w-100 h-100"  style="background-color:rgba(235, 87, 87, 0.05); border: 1px solid #EB5757;" >
  <div class="card-body">
    <h5 class="card-text">${modalInfo.description}</h5>
    <div class="d-flex justify-content-between align-items-center w-100">
    <div class="p-1 bg-white rounded text-center"><span>${modalInfo.pricing[0].price}</span><br><span>${modalInfo.pricing[0].plan}</span></div>
    <div class="p-1 bg-white rounded  text-center"><span>${modalInfo.pricing[1].price}</span><br><span>${modalInfo.pricing[1].plan}</span></div>
    <div class="p-1 bg-white rounded  text-center"><span>${modalInfo.pricing[2].price}</span><br><span>${modalInfo.pricing[2].plan}</span></div>
    </div>

    <div id="feature_instruction" class="d-flex justify-content-between">
    <div id="featureModal" class="">
      <h4>Features</h4>
      <ul>
      <li>${featureNames[0]}</li>
      <li>${featureNames[1]}</li>
      <li>${featureNames[2]}</li>
      </ul>
      </div>
      <div id="instructionModal" class=""> 
      <h4>Instruction</h4>
      <ul>
      
        <li>${modalInfo.integrations[0]}</li>
        <li>${modalInfo.integrations[1]}</li>
        <li>${modalInfo.integrations[2]}</li>
      </ul>
    </div>
    </div>

    
  </div>
  </div>
</div>



<div class="m-2 w-50 h-100">
  <div class="card w-100 " >
  <div class="card-img-top p-3">
    <img src="${modalInfo.image_link[0]}" class="rounded w-100" alt="...">
    <div class="card-img-overlay " >
      <button class=" btn" style="background-color: #EB5757; color: white; position: absolute; top: 5%; right: 4%;">${parseFloat(modalInfo.accuracy.score)*100+'%'+' '+'accuracy'}</button>
      </div>
    </div>
    <div class="card-body">
    <h3 class="card-text text-center">${modalInfo.input_output_examples[0].input}</h3>
    <p class="card-text text-center">
    ${modalInfo.input_output_examples[0].output}
    </p>
    </div>
  </div>
</div>
</div>
`;
            })
            .catch(error => {
              console.error(error);
            });
        });

        // Add the tool card to the tools container
        // toolsContainer.appendChild(toolElement);
      });

      // Disable the load more button if all tools have been loaded
      if (currentCardIndex >= tools.length) {
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
