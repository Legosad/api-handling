import { useEffect, useState } from 'react'
import axios from "axios";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 
  // const [products, error, loading] =   customReactQuery("/api/products")
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const controller = new AbortController();
    (async () => {
      try {
        setLoading(true)
        setError(false);
        const response = await axios.get("/api/products?search=" + search, { signal: controller.signal});
        console.log(response);
        setProducts(response.data);
        setLoading(false)
      } catch (error) {
        if(axios.isCancel(error)){
          console.log("Request Cancelled", error.message);
          return
        }
        setError(true);
        setLoading(false)
      }
    })()
    //Clean Up Code
    return () => {
      controller.abort()
    }
  },[search])

  // if(error){
  //   return <h1>Something Went Wrong</h1>
  // }
  // if(loading){
  //   return <h1>Loading...</h1>
  // }
  return (
    <>
      <h1>React API</h1>
      <input onChange={(e)=> setSearch(e.target.value)} type='text' placeholder='Search your Product' value={search} />
      {loading && ( <h2>Loading...</h2> )}
      {error && ( <h2>Something went Wrong </h2> )}

      <h2>Number of Products Are: {products.length}</h2>
      <div>
        {products.map((product) => {
          <div key={product.id} id={product.id}>
            <image src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App


const customReactQuery = (urlPath) => {
  // const [products, setProducts] = useState([])
  // const [error, setError] = useState(false)
  // const [loading, setLoading] = useState(false)

  // useEffect(()=>{
  //   (async () => {
  //     try {
  //       setLoading(true)
  //       setError(false);
  //       const response = await axios.get(urlPath);
  //       console.log(response);
  //       setProducts(response.data);
  //       setLoading(false)
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false)
  //     }
  //   })()
  // },[])

  return [products, error, loading]
}