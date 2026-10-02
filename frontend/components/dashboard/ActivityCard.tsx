export default function ActivityCard(){


const activities=[

"Leave request submitted",

"New HR policy uploaded",

"Attendance updated",

"Feedback received"

];


return (

<div
className="
card
"
>


<h2
className="
text-xl
font-semibold
mb-5
"
>

Recent Activity

</h2>


<div
className="
space-y-4
"
>


{
activities.map(
(item,index)=>(


<div
key={index}
className="
flex
items-center
gap-3
"
>


<div
className="
w-3
h-3
bg-blue-500
rounded-full
"
/>


<p>
{item}
</p>


</div>


)

)

}


</div>


</div>

)

}