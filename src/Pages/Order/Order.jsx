import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../AuthProvidors/FireBase/FirebaseConfig";
import Swal from "sweetalert2";

const Order = () => {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState();
  console.log(orderDetails?.orderData);
  useEffect(() => {
    const getData = async () => {
      try {
        const docRef = doc(db, "orderDetails", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderDetails(docSnap?.data());
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No Data Found!",
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getData();
  }, [user]);

  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='min-w-[90%] shadow-md border mx-auto border-gray-100 my-6'>
          <thead>
            <tr className='bg-[#0095FF] text-white'>
              <th className='py-4 px-6 text-lg text-left border-b'>
                Payment Id
              </th>
              <th className='py-4 px-6 text-lg text-left border-b'>Name</th>
              <th className='py-4 px-6 text-lg text-left border-b'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className='hover:bg-gray-50 border-b transition duration-300'>
              <td className='py-4 px-4 flex justify-start'>
                {orderDetails?.orderData?.id}
              </td>
              <td className='py-4 px-6 border-b text-xl font-medium'>
                {orderDetails?.orderData?.payer?.name?.given_name}
              </td>
              <td className='py-4 px-6 text-green-500 border-b text-lg font-medium'>
                {orderDetails?.orderData?.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Order;
