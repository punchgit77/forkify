
import { API_URL,KEY }from './config.js';
// import { getJSON, sendJSON } from './views/helpers.js';
import { AJAX } from './views/helpers';
import { RESULT_PER_PAGE } from './config.js';

// const clearbtn = document.querySelector('clear');
export const state={
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        resultsPerPage: RESULT_PER_PAGE,
    },
    bookmarks : [],
}

const createRecipeObject=(data)=>{
  const { recipe } = data.data;
  return { 
    id : recipe.id,
    title:recipe.title,
    publisher : recipe.publisher,
    sourceUrl : recipe.source_url,
    image : recipe.image_url,
    servings: recipe.servings,
    cookingTime : recipe.cooking_time,
    ingredients : recipe.ingredients,
     ...(recipe.key && { key : recipe.key}),

  }
}

export const loadRecipe=async (id)=> {
  try{
   const data = await AJAX(`${API_URL}${id}?key=${KEY}`); 
    state.recipe = createRecipeObject(data);
      if(state.bookmarks.some((el)=>el.id===id)){
        state.recipe.bookmarked = true;
      }
      else{

        state.recipe.bookmarked = false;
      }
    }
      catch(err){
        console.log(err);
      }
    //  console.log(recipe);
   

}



export const loadSearchResults = async function(query){
  try{
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map((rec)=>{
          return {
            
            id : rec.id,
            title:rec.title,
            img : rec.image_url,
            publisher : rec.publisher,
            ...(rec.key && { key : rec.key}),

            
             }
         })

         state.search.page = 1;
        //  console.log(state);
      }catch(err){

        console.log(err);
      }
  }


  
  export const limitedResults =(page = state.search.page)=>{
    state.search.page = page;
    let start = (page-1)*state.search.resultsPerPage; 
    let end = page*state.search.resultsPerPage;
    return state.search.results.slice(start,end);
  }
  
  export const updateServings=(newServings)=>{
         state.recipe.ingredients.forEach((ing) => {
                ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  
         });
         state.recipe.servings = newServings;
  }


 const persistedStorage = () =>{
       localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
   
 }         
          
export const addBookmark = (recipe)=>{
       state.bookmarks.push(recipe);
      if(recipe.id === state.recipe.id){
          state.recipe.bookmarked = true;
        }

        persistedStorage();
    }

export const deleteBookmark = (id)=>{
       const index = state.bookmarks.findIndex(el=>el.id === id);
       state.bookmarks.splice(index,1);

          if(id === state.recipe.id) state.recipe.bookmarked = false;

          persistedStorage();
    }

    const init=()=>{
           const storage  = localStorage.getItem('bookmarks');
           if(storage) state.bookmarks = JSON.parse(storage);
    }
  
    init();
    
    const clearStorage=()=>{
      localStorage.clear('bookmarks');
      
    }
// clearStorage();

    export const uploadRecipe = async (newRecipe)=>{
      try{

        const ingredients = Object.entries(newRecipe)
        .filter(entry=> entry[0].startsWith('ingredient') && entry[1]!=='')
        .map(ing=>{
                                     const ingArr = ing[1].split(',').map((el)=>el.trim());
                                     if(ingArr.length!==3){
                                       throw new Error("please enter the correct format!🍴");
                                     }
                                     const [quantity,unit,description] = ingArr;
                                     
                                     return {  quantity : quantity? +quantity:null , unit ,description };
                                    });
                                    // console.log(ingredients);
                                   
                                    // title:recipe.title,
                                    // source : recipe.source_url,
                                    // cooking_time : recipe.cooking_time,
                                    // id : recipe.id,
                                    // img : recipe.image_url,
                                    // ingredients : recipe.ingredients,
                                    // publisher : recipe.publisher,
                                    // servings: recipe.servings,
                            
                        const recipe = {
                          title:newRecipe.title,
                          source_url : newRecipe.sourceUrl,
                          // id : newRecipe.id,
                          image_url : newRecipe.image,
                          publisher : newRecipe.publisher,
                          cooking_time : +newRecipe.cookingTime,
                          servings: +newRecipe.servings,
                          ingredients,
                        }

                  const data = await AJAX(`${API_URL}?key=${KEY}`,recipe);
                  state.recipe = createRecipeObject(data);
                  addBookmark(state.recipe);
                      }catch(err){
                          throw err;
                      }
                           
    }

    // clearbtn.addEventListener('click',clearStorage());