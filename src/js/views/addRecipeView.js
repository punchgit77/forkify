import View from "./View";

class addRecipeView extends View{

   _parentElement  = document.querySelector('.upload');
   _message = "Recipe successfully uploaded...😻 "
   _overlayWindow = document.querySelector('.overlay');
   _window = document.querySelector('.add-recipe-window');
   _btnOpen = document.querySelector('.nav__btn--add-recipe');
   _btnClose = document.querySelector('.btn--close-modal');


  constructor(){
    super();
    this._AddHandlerOpenTheModal();
    this._AddHandlerCloseTheModal();
   //  this.addHanlderUpload();                  
  }

  toggleWindows(){
    this._overlayWindow.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

   _AddHandlerOpenTheModal(){
      this._btnOpen.addEventListener('click', this.toggleWindows.bind(this));
   }
   _AddHandlerCloseTheModal(){
      this._btnClose.addEventListener('click',this.toggleWindows.bind(this));
      this._overlayWindow.addEventListener('click',this.toggleWindows.bind(this));
   }

   addHanlderUpload(handler){
    
      this._parentElement.addEventListener('submit',function(e){
         e.preventDefault();
         const dataArr = [...new FormData(this)];
         const data = Object.fromEntries(dataArr);
     
         handler(data);

       })
   }

   _generateMarkUp(){

   }
}

export default new addRecipeView()