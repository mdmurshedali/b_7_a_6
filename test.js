
fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then(response => response.json())
  .then(data => {

    
    const tools = data.data.tools;
    // console.log(tools);

    
  //   tools.forEach(tool => {

  //     let publishedDateArray=tool.published_in.split('/');

	// 	  // console.log(publishedDateArray);

  //       let year = parseInt(publishedDateArray[2]);
  //       let month = parseInt(publishedDateArray[1]) - 1;
  //       let day = parseInt(publishedDateArray[0]);
        
  //       let publishedDate= new Date(year, month, day);
  //       tool.published_in=publishedDate;

  //         // const toolElement = document.createElement("div");
  //         // // toolElement.classList.add("tool");
  //         // toolElement.classList.add("card");
  //         // toolElement.innerHTML =`
              
  //         //     ` ;
  //       // publishedDate.push(tool.published_in)
	// 	// toolsContainer.appendChild(toolElement);
  // });
    // console.log(tools);

    tools.sort(function(a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
  });
  
  console.log(tools);


    
    


  })
  .catch(error => console.error(error));

