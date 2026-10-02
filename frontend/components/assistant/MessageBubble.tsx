interface Props{

role:string;

text:string;

}



export default function MessageBubble(
{
role,
text
}:Props
){


return (

<div
className={`
p-4
rounded-xl
max-w-xl

${
role==="user"
?
"bg-blue-600 text-white ml-auto"
:
"bg-gray-100"
}

`}
>


{text}


</div>

)

}