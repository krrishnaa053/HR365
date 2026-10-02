interface Props{

title:string;

value:string;

description:string;

}



export default function StatCard(
{
title,
value,
description
}:Props
){


return (

<div
className="
card
"
>


<p
className="
text-gray-500
"
>

{title}

</p>



<h2
className="
text-4xl
font-bold
mt-3
"
>

{value}

</h2>



<p
className="
text-sm
text-gray-400
mt-2
"
>

{description}

</p>


</div>

)

}