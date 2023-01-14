import View from "./View";
import previewView from "./previewView";
import icons from '../../img/icons.svg'


class ResultsView extends View{
    _parentElement = document.querySelector('.results')
    _errorMessage = 'no results found sorry try something different...'

    _generateMarkUp(){
      console.log(this._data)
      return this._data.map(bookmark=> previewView.render(bookmark,false)).join('');
              
  }


}


export default new ResultsView();