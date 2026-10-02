interface Props{

type:string;

date:string;

status:string;

}


export default function LeaveCard(
{
type,
date,
status
}:Props
){


return (

<div
className="
card
flex
justify-between
items-center
"
>


<div>

<h3
className="
font-semibold
text-lg
"
>

{type}

</h3>


<p
className="
text-gray-500
"
>

{date}

</p>


</div>



<span
className={`
px-4
py-2
rounded-full
text-sm

${
status==="approved"
?
"bg-green-100 text-green-700"
:
status==="rejected"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"

}

`}
>

{status}

</span>



</div>

)

}