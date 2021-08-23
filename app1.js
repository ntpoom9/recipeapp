// ของกล้า
const getRecipeofCategory = async (category)=>{
    screen.main.querySelector(".recipe-list").innerHTML = "";
    try{
        //https://themealdb.com/api/json/v1/1/filter.php?c=category
        const res = await fetch(API + "filter.php?c=" + category); 
        const data = await res.json();
         //console.log(data);
        const recipes = data.meals;
        for(let i = 0; i < recipes.length; i++){ //กำหนด loop ของข้อมูล
            let div = document.createElement("div"); //สร้าง div
            div.classList.add("item"); //เพิ่ม class item ลงใน div
            div.addEventListener("click",()=>{
                showFullRecipe(recipes[i].idMeal); //เรียกใช้ ฟังก์ชั่น showFullRecipe ส่ง id ไปด้วย
            });
            //19-27 เป็นการใส่ข้อมูลภายใน div
            div.innerHTML =` 
                <div>
                    <img src="${recipes[i].strMealThumb}">
                </div>
                <div class="details">
                    <h2>${recipes[i].strMeal}</h2>
                </div>
            `;
            screen.main.querySelector(".recipe-list").appendChild(div); //แสดงข้อมูลในคลาส div ภายใน class recipe-list
        }
    }catch(error){
        console.log("getRecipeofCategory :", error);
    }
}


// ของภูมิ
const getRecipeofCategory= async(category)=>{
    screen.main.querySelector(".recipe-list").innerhtml = "";

    try {
        //https://themealdb.com/api/json/v1/1/filter.php?c=category
        const res = await fetch(API + "filter.php?c=" + category);
        const data = await res.json();
        console.log(data);
        const recipes = data.meals;
        for(let i=0;i<recipes.length;i++){
            let div = document.createElement("div")
            div.classList.add("item");

            div.addEventListener("click",()=>{
                showFullRecipe(recipes[i].idMeal);
            });

            div.innerHTML =`
            <div class="thumbnail">
            <img src="${recipes[i].strMealThumb}"/>
            </div>
            <div class="details">
            <h2>${recipes[i].strMeal}</h2>
            </div>
            `;
            screen.main.querySelector(".recipe-list").appendChild(div);
        }

    } catch (error) {
        console.error("getRecipeofCategory",error)
    }
}