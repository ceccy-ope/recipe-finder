let btn1 = document.getElementById("btn1");

//assigning variables to the data to be received
const mealNameList = [];
const mealImageList = [];
const mealIdList = [];


//API fetching for the various dishes that can be cooked with the input ingredient

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

      // returning the searchbox to its empty state after an input of ingredient

      document.getElementById("ingredient").value = "";
      document.getElementById("ingredient").focus();

// targeting each 'get recipe' button for each dish so as to get the preparation details.

      let getButton = document.querySelectorAll("#btn2");
     

      for (let j = 0; j < getButton.length; j++) {
        getButton[j].addEventListener("click", function () {
          const modal = document.querySelector(".modal");
          const closeButton = document.querySelector(".close-button");
          const recipeDescription =
            document.getElementById("recipeDescription");

          // creating a function to pop up the modal when the get recipe button is clicked

          function toggleModal() {
            modal.classList.add("show-modal");
          }
          toggleModal();

          // creating a function to hide the modal when the close button is clicked

          function hideModal() {
            modal.classList.remove("show-modal");
          }

          //creating a function to fetch the meal description API and preparation 
          //ingredients and video once 'get recipe' is clicked

          function showModal() {
            let menuId = mealIdList[j];
            const mealPrep = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${menuId}`;
            

            fetch(mealPrep)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
               
                recipeDescription.innerHTML = `<h6 style = "text-align:center;">${mealNameList[j]}</h6>
                                              <img style = "width:100px; height: 100px; border-radius:50%; display:block; margin:auto" src=${data.meals[0].strMealThumb}>
                                              <h6>Ingredients</h6>
                                              <p style="font-size:10px;font-weight:100;">
                                              ${data.meals[0].strIngredient1}(${data.meals[0].strMeasure1}),
                                              ${data.meals[0].strIngredient2}(${data.meals[0].strMeasure2}),
                                              ${data.meals[0].strIngredient3}(${data.meals[0].strMeasure3}),
                                              ${data.meals[0].strIngredient4}(${data.meals[0].strMeasure4}),
                                              ${data.meals[0].strIngredient5}(${data.meals[0].strMeasure5}),
                                              ${data.meals[0].strIngredient6}(${data.meals[0].strMeasure6}),
                                              ${data.meals[0].strIngredient7}(${data.meals[0].strMeasure7}),
                                              ${data.meals[0].strIngredient8}(${data.meals[0].strMeasure8}),
                                              ${data.meals[0].strIngredient9}(${data.meals[0].strMeasure9}),
                                              ${data.meals[0].strIngredient10}(${data.meals[0].strMeasure10}),
                                              ${data.meals[0].strIngredient11}(${data.meals[0].strMeasure11}),
                                              ${data.meals[0].strIngredient12}(${data.meals[0].strMeasure12}),
                                              ${data.meals[0].strIngredient13}(${data.meals[0].strMeasure13}),
                                              ${data.meals[0].strIngredient14}(${data.meals[0].strMeasure14}),
                                              ${data.meals[0].strIngredient15}(${data.meals[0].strMeasure15}),
                                              ${data.meals[0].strIngredient16}(${data.meals[0].strMeasure16}),
                                              ${data.meals[0].strIngredient17}(${data.meals[0].strMeasure17}),
                                              ${data.meals[0].strIngredient18}(${data.meals[0].strMeasure18}),
                                              ${data.meals[0].strIngredient19}(${data.meals[0].strMeasure19}),
                                              ${data.meals[0].strIngredient20}(${data.meals[0].strMeasure20}),
                                              </p>
                                              <h6>How To Prepare</h6>
                                              <p style="font-size:10px;font-weight:100;">${data.meals[0].strInstructions}</p>
                                              <a style = "font-size:10px;" href=${data.meals[0].strYoutube}>Youtube Video</a>
                                              `;
              })
              .catch((error) => {
                console.log("Error:", error);
              });

//creating a function to hide modal if window is clicked
            function windowOnClick(event) {
              if (event.target === modal) {
                hideModal();
              }
            }

            closeButton.addEventListener("click", hideModal);
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
