import View from "./View";
import icons from '../../img/icons.svg'

class PaginationView extends View{

   _parentElement  = document.querySelector('.pagination');

    addHandlerClick(handler){
          this._parentElement.addEventListener('click',function(e){
                const btn = e.target.closest('.btn--inline');
        
                if(!btn) return;
        
                const goToPage = +btn.dataset.goto;

                handler(goToPage);

          })    
        }

   _generateMarkUp(){
         const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);
         const currPage = this._data.page;
         //page 1 and other...
         if(currPage===1 && numPages>1){
             return `<button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
             <span>Page ${currPage + 1}</span>
             <svg class="search__icon">
             <use href="${icons}#icon-arrow-right"></use>
             </svg>
         </button>`
         }

         //page inbetweene....
         if(currPage<numPages){
            return `
                <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage-1}</span>
            </button>
            <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage+1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>`;
         }
         
         //last page......
         if(currPage===numPages){
            
            return `
              <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                   <span>${currPage-1}</span>
               </button>`
         }

         
         //only 1 page..........
         return ''
           }

}

export default new PaginationView()