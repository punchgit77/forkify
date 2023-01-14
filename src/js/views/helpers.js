import { TIME_OUT_SEC } from "../config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  
  
export const AJAX = async function(url,uploadData = undefined){
  try {
    const fetchPro = uploadData?  fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(uploadData),
    }) : fetch(url);


      const res =  await Promise.race([fetchPro,timeout(TIME_OUT_SEC)]);
      // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc3e');
  
      const data = await res.json();
  
       if(!res.ok) throw new Error(`${data.message} (${res.status})`) 
       return data;
     
     } catch (err) {
         console.error(err);
     } 
}

export const getJSON = async function(url){
   try {

    const fetchPro = fetch(url);
    const res =  await Promise.race([fetchPro,timeout(TIME_OUT_SEC)]);
    // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc3e');

    const data = await res.json();

     if(!res.ok) throw new Error(`${data.message} ${res.status}`) 
     return data;
   
   } catch (error) {
       console.error(error);
   } 
    
}

export const sendJSON = async function(url,uploadData){
  try {
    const fetchPro =  fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(uploadData)
    });

   const res =  await Promise.race([fetchPro,timeout(TIME_OUT_SEC)]);
   // const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc3e');

   const data = await res.json();

    if(!res.ok) throw new Error(`${data.message} ${res.status}`) 
    return data;
  
  } catch (error) {
      console.error(error);
  } 
   
}
