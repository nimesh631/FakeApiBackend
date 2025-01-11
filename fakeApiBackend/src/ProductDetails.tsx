import {useState,useEffect} from 'react'
import { fetchProduct } from './api'
import { Products } from './types'
import {  useParams } from 'react-router-dom'

function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Products |null>(null);
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null >(null);
      
    
      useEffect(() => {
        const loadProduct = async () => {
          try {
            if(id){
                const data = await fetchProduct(Number(id));
                setProduct(data);
            }
        
          } catch (error) {
            setError("failed to load products");
          } finally {
            setLoading(false);
          }
        };
        loadProduct();
      }, [id]);

     if (loading) return <p>loading ...</p>;
     if (error) return <p className="text-red-600">{error}</p>;
     if (!product) return <p>product not found</p>

  return (
    <>
    <div>
    <h1 className="text-3xl mb-2">Product Details</h1>
  </div>
    <div className='max-w-md mx-auto p-4 border rounded-md shadow-md bg-gray-400'>
        <img className='max-h-36 max-w-20, mx-auto bg-white rounded-lg'  
        src={product.images[0]} alt={product.title} />
        <h1 className='text-2xl font-bold mt-4'>{product.title}</h1>
        <p className='text-black'>Price: ${product.price}</p>
        <p className='text-yellow-800'>Rating: {product.rating}</p>
        <p className='text-black'>Category: {product.category}</p>
        <p className='text-black mt-4 max-w-sm"'>Description<br/>{product.description}</p>
        
       
    </div>
    
    </>
  )
}

export default ProductDetails
