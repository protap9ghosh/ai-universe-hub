// fetch data functionality
const fetchData = () => {
  const URL = "https://openapi.programming-hero.com/api/ai/tools";
  try {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => displayDataFunc(data.data.tools));
  } catch (err) {
    console.log(err);
  }
};


// This function determines how the data will appear on the display
const displayDataFunc = (allToolsData) => {
  const mainContainer = document.getElementById("main-container");
  const showAllBtn = document.getElementById("showAll-btn");
  const sortByDateBtn = document.getElementById("sortByDateBtn");

  // The following function works on how the data will be shown on the display in an ascending manner through the date.
  sortByDateBtn.addEventListener("click", () => {
    sortByDateBtn.style.cursor = "not-allowed";
    const compareDates = (dateOne, dateTwo) => {
      const firstDate = new Date(
        dateOne.published_in.split("/").reverse().join("-")
      );
      const secondDate = new Date(
        dateTwo.published_in.split("/").reverse().join("-")
      );

      return firstDate - secondDate;
    };
    allToolsData.sort(compareDates);
    displayDataFunc(allToolsData);
  });


  // First show 6 data and then how to show all data by making button visible through condition.
  const firstSixItems = allToolsData.slice(0, 6);
  if (allToolsData.length > firstSixItems.length) {
    showAllBtn.style.display = "block";
    showAllBtn.addEventListener("click", () => {
      mainContainer.innerHTML = "";
      displayShowData(allToolsData);

      showAllBtn.style.display = "none";
    });
  } else {
    showAllBtn.style.display = "none";
  }

  displayShowData(firstSixItems);
};


// The following function does the job of displaying the data
const displayShowData = (allTools) => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  allTools.forEach((singleTool) => {
    const { image, name, features, published_in, id } = singleTool;

    mainContainer.innerHTML += `
          
          <div class="card glass p-4 mx-8">
          <figure>
            <img src=${image} alt="car!" />
          </figure>
          <div>
            <h2 class="mt-2 text-xl font-semibold">Features:</h2>
            <ul class="list-decimal">
             ${features
               .map((feature) => `<li class="ml-4">${feature}</li>`)
               .join("")}
            </ul>
      
          </div>
          <hr class="my-2" />
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium">${name} </h3>
              <i class="fa-regular fa-calendar-days"></i>
              <span class="ml-1 font-medium">${published_in} </span>
            </div>
            <label onClick="toolInfo('${id}')" for="my-modal-3" class="fa-solid fa-arrow-right mr-2 bg-pink-300 hover:bg-pink-400 p-2 rounded-full text-white cursor-pointer"></label>
          </div>
        </div>          
        `;
  });
};

// The work of the following function is to fetch the data through dynamic ID
const toolInfo = (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  try {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => displayToolInfo(data.data));
  } catch (err) {
    console.log(err);
  }
};


// Displaying dynamic ID data through modals
const displayToolInfo = (singleToolInfo) => {
  const {
    description,
    pricing,
    features,
    integrations,
    image_link,
    input_output_examples,
    accuracy,
  } = singleToolInfo;

  const featureArr = [];
  for (const feature in features) {
    const values = Object.values(features[feature]);
    featureArr.push(values[0]);
  }
