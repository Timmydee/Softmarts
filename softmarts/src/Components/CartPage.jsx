import { useContext } from "react"
import { CartContext } from "../Context/Cart"


const CartPage = () => {
  const {cartItems, addToCart, removeFromCart, getCartTotal} = useContext(CartContext)
  
  const checkout = async () => {
    await fetch('https://softtmarts-be.onrender.com/checkout', {
      method: "POST",
      headers : {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({items: cartItems})
    }).then((response) => {
      return response.json()
    }).then((response) => {
      if(response.url) {
        window.location.assign(response.url)
      }
    })
  }


  return (
    <div className="w-full lg:px-5 px-2 bg-gray-200">
      <div className="">
        <div className=" py-3 font-medium">
          <h6>Cart Summary</h6>
        </div>
        <div className="flex justify-between py-3 font-medium">
          <h6>SubTotal</h6>
          <h6>${getCartTotal()}</h6>
        </div>

        <div>
          <div>
            {cartItems && cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center shadow-md py-5 px-5 my-3 lg:space-x-0 space-x-3 bg-white">
                <div className="flex items-center justify-center space-x-3">
                  <img src={item.image} alt="Image" className="lg:h-52 h-32 rounded-md" />
                  <div className="font-medium lg:block hidden">
                  <h3>{item.title}</h3>
                </div>
                </div>

                
                
                <div className="">
                <div className="font-medium lg:hidden block">
                  <h3>{item.title.slice(0,19)}</h3>
                </div>
                  <h3 className="font-normal">${item.price}</h3>

                  <div className="flex justify-start items-center lg:space-x-6 lg:mt-4 mt-1 space-x-2">
                    <button onClick={() => addToCart(item)} className="border lg:p-3 p-2 cursor-pointer bg-green-500 text-white rounded-md">Add</button>
                    <div className="p-3">{item.quantity}</div>
                    <button onClick={() => removeFromCart(item)} className="border lg:p-3 p-2 cursor-pointer bg-red-500 text-white rounded-md">Minus</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={checkout} className="w-full py-4 bg-green-400 font-normal text-white border-none mt-4 rounded-lg">Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage