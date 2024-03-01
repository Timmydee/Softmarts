// import { useEffect, useState } from "react";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   async function getProduct() {
//     const response = await fetch("https://fakestoreapi.com/products/");
//     const data = await response.json();
//     setProducts(data);
//   }

//   useEffect(() => {
//     getProduct();
//   }, []);

//   console.log(products);

//   return (
//     <div>
//       <div className="w-full px-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 space-x-3 space-y-3">
//         {products &&
//           products.map((product) => (
//             <div key={product.id} className="shadow-lg px-10 py-5">
//               <div className="flex items-center justify-center">
//                 <img
//                   src={product.image}
//                   alt="image"
//                   className="h-52 rounded-md"
//                 />
//               </div>
//               <div className="mt-6 h-40">
//                 <h6 className="font-bold text-black">{product.title}</h6>
//                 <h6 className="font-small text-black mt-2">
//                   {product.description.slice(0, 52)}...
//                 </h6>
//                 <h3 className="font-normal mt-2">${product.price}</h3>
//               </div>

              
//                 <button
//                   className=" bg-green-600 text-white px-6 py-3 shadow-md hover:bg-green-800"
//                 >
//                   Add to Cart
//                 </button>
              
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/Cart";

const Products = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const [products, setProducts] = useState(cartItems);

  async function getProduct() {
    const response = await fetch("https://fakestoreapi.com/products/");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  console.log(products);

  const isCart = (product) => {
    return cartItems && cartItems.find((item) => item.id === product.id);
  };

  return (
    <div>
      <div className="w-full px-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 space-x-3 space-y-3">
        {products &&
          products.map((product) => (
            <div key={product.id} className="shadow-lg px-10 py-5">
              <div className="flex items-center justify-center">
                <img
                  src={product.image}
                  alt="image"
                  className="h-52 rounded-md"
                />
              </div>
              <div className="mt-6 h-40">
                <h6 className="font-bold text-black">{product.title}</h6>
                <h6 className="font-small text-black mt-2">
                  {product.description.slice(0, 52)}...
                </h6>
                <h3 className="font-normal mt-2">${product.price}</h3>
              </div>

              {!isCart(product) ? (
                <button
                  className=" bg-green-600 text-white px-6 py-3 shadow-md hover:bg-green-800"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex justify-start items-center lg:space-x-6 lg:mt-4 mt-1 space-x-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="border lg:p-3 p-2 cursor-pointer bg-green-500 text-white rounded-md"
                  >
                    Add
                  </button>
                  <div className="p-3">{isCart(product).quantity}</div>
                  <button
                    onClick={() => removeFromCart(product)}
                    className="border lg:p-3 p-2 cursor-pointer bg-red-500 text-white rounded-md"
                  >
                    Minus
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
