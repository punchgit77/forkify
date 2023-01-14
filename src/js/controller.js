
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import ResultsView from './views/ResultsView.js';
import searchView from './views/seachView.js'
import paginationView from './views/paginationView.js';
import BookmarkView from './views/BookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';


const recipeContainer = document.querySelector('.recipe');
const btn = document.querySelector('btn');

if(module.hot){
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2


const controllRecipes = async ()=>{
        try {
          const id = (window.location.hash).slice(1);
          if(!id) return;
          await model.loadRecipe(id);
          // recipeView.renderSpinner();
          recipeView.renderSpinner();
         //0) load
         BookmarkView.render(model.state.bookmarks);
          // 1)bookmark render
          
          // 3) recipeupdate;
          ResultsView.update(model.limitedResults());
          
         //4)show
          recipeView.render(model.state.recipe);



                

        } catch  {
          console.error(`Error:"9999"`);
          recipeView.RenderError();
        }
}




const controlSearchResults = async function(){
  
    try {

      ResultsView.renderSpinner();
    // 1) get Search Query-------------------------------------------
      const query =  searchView.getQuery();
      if(!query) return;

    // 2) load Search Results-----------------------------------------
      await model.loadSearchResults(query);
      
    // 3) Render Results
      ResultsView.render(model.limitedResults());


      paginationView.render(model.state.search);

      
    } catch(err){

      console.error(err);

    }

}
// controlSearchResults('pizza')
// controllRecipes();
const controlPagination = (goToPage)=>{
    ResultsView.render(model.limitedResults(goToPage));

    paginationView.render(model.state.search);

}

const controlServings = function(updateserve){
    model.updateServings(updateserve);

    recipeView.update(model.state.recipe);
}

const ControlBookMark =()=>{

  if(!model.state.recipe.bookmarked) {
         model.addBookmark(model.state.recipe);

  }
  else model.deleteBookmark(model.state.recipe.id) ; 

   recipeView.update(model.state.recipe);
   BookmarkView.render(model.state.bookmarks);
}

const controlAllBookMarks =()=>{
  BookmarkView.render(model.state.bookmarks);
}

const controllAddRecipe = async (newRecipe)=>{
       try{
        //upload the new Recipe data..
         await model.uploadRecipe(newRecipe);
        // render recipe...
         recipeView.render(model.state.recipe);

        //success message.....
          addRecipeView.RenderMessage();

        // Render bookmark view.....
        BookmarkView.render(model.state.bookmarks);

        //change ID in URL....
        window.history.pushState(null,'',`#${model.state.recipe.id}`);
        //close form window
        setTimeout(function(){
          addRecipeView.toggleWindows();
        },MODAL_CLOSE_SEC*1000)
         
      }catch(err){
        console.error(err);
        addRecipeView.RenderError(err.message);
      }
}

const init = function(){
  recipeView.addHandlerRender(controllRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(ControlBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  BookmarkView.addHandlerBookRender(controlAllBookMarks);
  addRecipeView.addHanlderUpload(controllAddRecipe);

}

init();

// window.addEventListener(g,controllRecipes);

// window.addEventListener('hashchange',controllRecipes);
// window.addEventListener('load',controllRecipes);
// console.log('TEST')

///////////////////////////////////////