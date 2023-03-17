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
