import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

/* Fonts Used */

@font-face{
  font-family: 'Other';
  src: url(/fonts/poor_richard.ttf);
}

@font-face{
  font-family: 'Main';
  src: url(/fonts/footlight.ttf);
}

@font-face{
  font-family: 'Styled';
  src: url(/fonts/redressed.ttf);
}

/* Fonts Used End */



/* ------------------------------------------------------------------ */



/* Fonts Size and Rem selection */

html{
  font-size: 16px;
}

@media screen and (max-width: 800px) {
  
  html{
    font-size: 15px;
  }

}

@media screen and (max-width: 700px) {
  
  html{
    font-size: 14px;
  }

}

@media screen and (max-width: 600px) {
  
  html{
    font-size: 13px;
  }

}

@media screen and (max-width: 500px) {
  
  html{
    font-size: 11px;
  }

}

@media screen and (max-width: 400px) {
  
  html{
    font-size: 10px;
  }

}

@media screen and (max-width: 400px) {
  
  html{
    font-size: 9px;
  }

}

@media screen and (max-height: 300px) {
  
  html{
    font-size: 8px;
  }

}

@media screen and (max-width: 270px) {
  
  html{
    font-size: 7px;
  }

}

@media screen and (max-width: 200px) {
  
  html{
    font-size: 6px;
  }

}

@media screen and (max-width: 100px) {
  
  html{
    font-size: 5px;
  }

}

@media screen and (max-width: 80px) {
  
  html{
    font-size: 4px;
  }

}

@media screen and (max-width: 50px) {
  
  html{
    font-size: 4px;
  }

}

/* Fonts Size and Rem selection END */



/* ------------------------------------------------------------------ */



/* Base Elements Styles */

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  font-family: inherit;
  font-size: inherit;
  word-break: break-word;
  line-height: inherit;
}

body{
  min-height: 100vh;
  font-size: .8rem;
  line-height: 2rem;
  font-family: Main;
  background-color: #f7f7f7;
  color: #323232;
  overflow-x: hidden;
  padding-right: .1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}

body > #__next{
  width: 100%;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}

.absolute-invisibility{
  position: absolute;
  display: none;
  width: 0; height: 0;
  border: 0; outline: 0;
  background: transparent;
}

a{
  color: slategray;
}

button{
  border: 1px solid grey;
  background-color: transparent;
  outline: 0 none;
  cursor: pointer;
  padding: 0 .5rem;
}


/* Base Elements Styles */



/* ------------------------------------------------------------------ */


/* Magnifing Glass */

.el-img-magnifier-glass {
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: none;
  /*Set the size of the magnifier glass:*/
  width: 100px;
  height: 100px;
}

/* Magnifing Glass ENDS */


/* ------------------------------------------------------------------ */


/* Custom Scroll bar */

::-webkit-scrollbar {
  width: .3rem;
  height: .3rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Custom Scroll bar END */

/* ------------------------------------------------------------------ */



/* Autocomplete for Input */

.el-autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.el-autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

.el-autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}

.el-autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}

/* Autocomplete for Input ENDS */



/* ------------------------------------------------------------------ */


input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}

/* ------------------------------------------------------------------ */
`

export default GlobalStyle;