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
