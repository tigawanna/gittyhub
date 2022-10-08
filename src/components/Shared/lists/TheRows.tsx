import React from 'react'



interface TheRowsProps {
list?:any
}

export const TheRows: React.FC<TheRowsProps> = ({list}) => {
return (
 <div className='w-full flex flex-col items-center justify-center'>

{list&&list.map((item:any)=>{
return <OneRow key={item.id} item={item}/>
})}
 </div>
);
}


interface OneRowProps {
item:any
}

export const OneRow: React.FC<OneRowProps> = ({item}) => {
return (
  <div
    className="p-1 m-1 w-full rounded-md  pop-in
              shadow shadow-slate-600 flex flex-col border border-black"
  >
    <div className="w-full text-lg font-normal text-purple-600">{item.id}</div>
    <div className="w-full text-lg text-bold">{item.name}</div>
    <div className="w-full text-base font-normal">
      {item.age} {item.bio}
    </div>
  </div>
);
}





