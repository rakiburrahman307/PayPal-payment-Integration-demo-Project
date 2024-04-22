import { useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";



const DemoProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='my-10 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md'>
      <h2 className='text-center text-3xl font-bold mb-10'>Demo Products</h2>
      {isLoading && (
        <span className='loading ml-[620px] loading-dots loading-lg'></span>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {products?.slice(0, 3).map(product => (
          <Link to={`/details/${product?.id}`} key={product?.id}>
          <div
          className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 duration-500 ease-in-out transform hover:shadow-lg hover:scale-105'
        >
          <div
            style={{
              backgroundImage: `url(${product?.thumbnail})`,
              backgroundSize: "cover",
              height: "300px",
            }}
          >
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className='hidden'
            />
          </div>

          <div className='px-5 pb-5'>
            <a href='#'>
              <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
                {product?.title}
              </h5>
            </a>
            <div className='flex items-center mt-2.5 mb-5'>
              <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
                {product?.rating}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                $100
              </span>
            </div>
          </div>
        </div></Link>
        ))}
      </div>
    </div>
  );
};

export default DemoProducts;
