let btn1 = document.getElementById("btn1");
const mealNameList = [];
const mealImageList = [];
const mealIdList = [];

//creating a function for filling card with meal data
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

          mealList.appendChild(eachMeal);
          mealList.classList.add("cardwrapper");
          eachMeal.classList.add("card");
        }
      }
      document.getElementById("ingredient").value = "";
      document.getElementById("ingredient").focus();

      //to get meal description on clicking button

      const modal = document.querySelector(".modal");
      const closeButton = document.querySelector(".close-button");
      const recipeDescription = document.getElementById("recipeDescription");

      let getButton = document.querySelectorAll("#btn2");
      console.log(getButton);

      for (let j = 0; j < getButton.length; j++) {
      
      function toggleModal() {
        modal.classList.toggle("show-modal");
        }
       

         function hideModal() {
           modal.style.display = "none";
         }
      

         function windowOnClick(event) {
           if (event.target === modal) {
             hideModal();
           }
         }
        

        getButton[j].addEventListener("click", toggleModal);
         closeButton.addEventListener("click", hideModal);
         window.addEventListener("click", windowOnClick);
        
      }

    
     

      
    })
    .catch((error) => {
      console.log("Error:", error);
    });

 
}

btn1.addEventListener("click", func);




    

    // function showModal() {
    //     let menuId = mealIdList[j];
    //     const mealPrep =
    //     "https://www.themealdb.com/api/json/v1/1/lookup.php?i= " + " menuId";
    //     console.log(`the meal is:${menuId}`);

    //     fetch(mealPrep)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         console.log("Error:", error);
    //     });

    //     recipeDescription.textContent = "hello";
    //     function windowOnClick(event) {
    //     if (event.target === modal) {
    //         toggleModal();
    //     }
    //     }

    
  
