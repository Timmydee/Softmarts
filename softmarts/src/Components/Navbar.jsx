// import { Link } from "react-router-dom"

// const Navbar = () => {

//   return (
//     <div className="w-full px-1 shadow-emerald-50 py-5 border">
//         <div className="flex justify-between">
//             <Link to='/'>SoftMart</Link>
//             <div className="flex space-x-3">
//                 <Link to='/'>Account</Link>
//                 <Link to='/cart'>Cart</Link>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar


import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../Context/Cart"

const Navbar = () => {
  const {cartItems} = useContext(CartContext)

  return (
    <div className="w-full px-1 shadow-emerald-50 py-5 border">
        <div className="flex justify-between">
            <Link to='/'>SoftMart</Link>
            <div className="flex space-x-3">
                <Link to='/'>Account</Link>
                <Link to='/cart'>Cart({cartItems.length})</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar