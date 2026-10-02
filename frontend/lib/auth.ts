export function getUser(){

if(typeof window==="undefined")
return null;


const user =
localStorage.getItem(
"hr_user"
);


return user
?
JSON.parse(user)
:
null;

}



export function logout(){

localStorage.removeItem(
"hr_user"
);


window.location.href="/login";

}
