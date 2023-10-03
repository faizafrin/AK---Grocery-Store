

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "ODN3RGt2Vm9VbndUVnFSdG90aGFOSlVLcWJnVVZXNTdPRnpMUFAwNg==");

var requestOptions = {
method: 'GET',
headers: headers,
redirect: 'follow'
};

const state  = async()=>{

try {
   
let response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
return await response.json()
} catch (error) {
   return error
}
}

const city  = async(state)=>{

   try {
      
   let response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`, requestOptions)
   return await response.json()
   } catch (error) {
      return error
   }
   }


export {state, city};
