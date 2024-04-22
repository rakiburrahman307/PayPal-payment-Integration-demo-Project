import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import CouponForm from "./CouponForm";
import PayPal from "./PayPal";

const Payment = () => {
  const product = useLoaderData();
  const [discountAmount, setDiscountAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(100 || 0);
  const applyCoupon = couponCode => {
    if (couponCode === "DEMO") {
      setDiscountAmount(50);
    } else {
      setDiscountAmount(0);
    }
  };
  <div className=''></div>;
  useEffect(() => {
    const discountedPrice = Math.max(100 - discountAmount, 0);
    setTotalPrice(discountedPrice);
  }, [discountAmount, product]);

  return (
    <div className='border/10 mx-auto my-20 w-[350px] rounded-2xl bg-white p-6 shadow-lg dark:bg-[#18181B] md:p-8'>
      <div className='flex flex-col items-center justify-center space-y-2'>
        <h1 className='text-3xl font-bold mb-5'>Checkout Page</h1>
        <p className='text-center font-medium text-slate-700 dark:text-white/80'>
          Product Price: $100
        </p>
        <p className='text-center font-medium text-slate-700 dark:text-white/80'>
          Discount Amount: ${discountAmount}
        </p>
        <p className='text-center font-medium text-slate-700 dark:text-white/80'>
          Total Price: ${totalPrice}
        </p>
        <h6 className='text-center font-medium text-slate-700 dark:text-white/80'>
          Use the <span className='text-red-500'>&quot;DEMO&quot;</span> coupon
          code To Discount 50${" "}
        </h6>
        <CouponForm applyCoupon={applyCoupon} />
      </div>
      <div className='mt-20 z-10'>
        <PayPal totalPrice={totalPrice} product={product}></PayPal>
      </div>
    </div>
  );
};

export default Payment;
