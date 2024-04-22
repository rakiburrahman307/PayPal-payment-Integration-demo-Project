import { Link, useLoaderData } from "react-router-dom/dist";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styleTab.css";

const Details = () => {
  const product = useLoaderData();

  const types = [
    {
      id: 1,
      name: "Description",
    },
    {
      id: 2,
      name: "Review",
    },
  ];
  return (
    <div className='px-5'>
      <div className='card lg:card-side bg-base-100 shadow-xl mt-5 md:h-96 h-auto'>
        <figure>
          <img src={product?.thumbnail} alt='Album' />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>{product?.title}</h2>

          <div className='flex flex-col items-start mb-28'>
            <p>{product?.brand}</p>
            <span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mt-1'>
              {product?.rating}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold text-gray-900 dark:text-white'>
              $100
            </span>
          </div>
          <div className='card-actions justify-end'>
            <Link to={`/payment/${product?.id}`}>
              <button className='rounded-lg border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-sky-500 hover:text-white'>
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Tabs>
        <TabList>
          {types?.map(type => (
            <Tab key={type?.id}>{type?.name}</Tab>
          ))}
        </TabList>
        <TabPanel>
          <p>{product?.description}</p>
        </TabPanel>
        <TabPanel>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mx-6'>
            <p>No Reviews</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Details;
