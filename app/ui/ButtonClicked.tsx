'use client'

 const ButtonClicked = () => {
  return (
    <button className='bg-blue-900' onClick={()=>{
        console.log("Your button is clicked")
    }}>click</button>
  )
}

export default ButtonClicked
