// API URLs
const API = "https://themealdb.com/api/json/v1/1/";
const app = document.querySelector(".app");
const screen = {
    main: app.querySelector(".main-screen"),
    recipe: app.querySelector(".recipe-screen"),
};

//ดึง data ในหมวดหมู่นั้น ๆ
// ใช้ API อันที่2 แสดงรูป และ ข้อมูล
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
                <div class="thumbnail">
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

const showFullRecipe = async(recipeId)=>{

    // ดึง recipe ออกมาโชว์
    screen.main.classList.add("hidden");
    screen.recipe.classList.remove("hidden");

    // ปิด recipe ดึง main กลับมาโชว์
    screen.recipe.querySelector(".back-btn").addEventListener("click",()=>{
        screen.recipe.classList.add("hidden");
        screen.main.classList.remove("hidden");
        // เคลียร์ค่าเก่าออก ตรง recipe
        screen.recipe.querySelector(".thumbnail img").src="";
        screen.recipe.querySelector(".details h2").innerHTML="";
        screen.recipe.querySelector(".details ul").innerHTML="";
        screen.recipe.querySelector(".details ol").innerHTML="";


    })

    try {
        const res = await fetch(API + "lookup.php?i=" + recipeId)
        const data = await res.json();
        console.log(data);

        let recipe = data.meals[0];

        screen.recipe.querySelector(".thumbnail img").src = recipe.strMealThumb;
        screen.recipe.querySelector(".details h2").innerText = recipe.strMeal;

        // ------------------Ingredient-------------------
        // แสดงข้อมูลใน Ingredient และโชว์ สูตร ไปใส่ใน details
        for(let i =1; i<=20;i++){
            if(recipe["strIngredient"+i].length == 0){
                break;
            }
        let li = document.createElement("li");
        li.innerText = `${recipe["strIngredient"+i]} - ${recipe["strMeasure" + i]}`;
        screen.recipe.querySelector(".details ul").appendChild(li);
        }
    // ------------------Instructions-------------------
        // ตัดช่องว่างข้อความ
        let instructions = recipe.strInstructions.split("\r\n").filter((str)=>str);
        // console.log(instructions);

        for(let i=0; i<instructions.length;i++){
            let li = document.createElement("li");
        li.innerText = `${instructions[i]}`;
        screen.recipe.querySelector(".details ol").appendChild(li);
        }


    } catch (error) {
        console.error("showFullRecipe",error)
    }
}

const main = async()=>{
    // await คู่ async
    try {
        // https://themealdb.com/api/json/v1/1/list.php?c=list

    // -----------------เรียก API---------------
    const res = await fetch(API+"list.php?c=list");
    const data = await res.json();
    // console.log(data);
    const categories = data.meals;
    console.log(categories);

    // -----------------ลูปข้อมูลออกมา---------------
    for(let i=0;i<categories.length;i++){
        let div = document.createElement("div");
        div.innerText = categories[i].strCategory;
        
        div.addEventListener("click",()=>{
            screen.main
            .querySelector(".categories .active")
            .classList.remove("active")
            div.classList.add("active");
            getRecipeofCategory(categories[i].strCategory)
        });

        //  ค่า default ให้อัน1เลือกก่อนเสมอ
        if(i==0){
            div.classList.add("active");  
             getRecipeofCategory(categories[i].strCategory)
        }
        
        screen.main.querySelector(".categories").appendChild(div);
    };

    } catch (error) {
        console.error("Main:",error);
    }
    

};
main();