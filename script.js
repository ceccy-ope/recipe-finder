let btn1 = document.getElementById("btn1");

const mealNameList = [];
const mealImageList = [];
const mealIdList = [];

function func() {
  let search = document.getElementById("ingredient").value;
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    
     //creating an array for mealname
      let arr = data.meals;
      for (let i of arr) {
        var mealName = i.strMeal;
        mealNameList.push(mealName);

        //creating an array for mealimage
        var mealImage = i.strMealThumb;
        mealImageList.push(mealImage);

        //creating an array for mealid
        var mealId = i.idMeal;
        mealIdList.push(mealId);

        //creating the meal cards

        if (mealName != "") {
          let mealList = document.querySelector("ul");
          let eachMeal = document.createElement("li");
          eachMeal.innerHTML = `<div class="imagebg">
                                   <img  class="foodcard" src=${mealImage}>
                                </div>
                                <div class="foodname">
                                    <h1>${mealName}</h1>
                                   <button id ='btn2' class="trigger">Get Recipe</button>
                                </div>`;
          
          //styling the cards

          mealList.appendChild(eachMeal);
          mealList.classList.add("cardwrapper");
          eachMeal.classList.add("card");
        }
      }
      document.getElementById("ingredient").value = "";
      document.getElementById("ingredient").focus();

      let getButton = document.querySelectorAll("#btn2");
      console.log(getButton);

      for (let j = 0; j < getButton.length; j++) {
        getButton[j].addEventListener("click", function () {
          const modal = document.querySelector(".modal");
          const closeButton = document.querySelector(".close-button");
          const recipeDescription = document.getElementById("recipeDescription");


          function toggleModal() {
            modal.classList.add("show-modal");
          }
          toggleModal()

          function showModal() {
          
            let menuId = mealIdList[j];
            const mealPrep = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuId}`
              console.log(`the meal is:${mealPrep}`);
            
              fetch(mealPrep)
              .then((response)=>{
                return response.json()
              })
              .then((data)=>{
                console.log(data)

              })
              .catch((error)=>{
                console.log("Error:", error);

              })
            
            recipeDescription.textContent = 'hello'
            function windowOnClick(event) {
              if (event.target === modal) {
                toggleModal();
              }
            }

            closeButton.addEventListener("click", toggleModal);
            window.addEventListener("click", windowOnClick);
          }
          showModal();

            // console.log(mealNameList[j], mealImageList[j], mealIdList[j]);
        });
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

btn1.addEventListener("click", func);
