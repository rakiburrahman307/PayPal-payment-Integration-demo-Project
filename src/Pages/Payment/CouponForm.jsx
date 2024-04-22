import { useState } from "react";
import PropTypes from "prop-types";
const CouponForm = ({ applyCoupon }) => {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
  };

  return (
    <div className='relative w-max rounded-lg'>
      <input
        type='text'
        className='peer rounded-lg border border-[#1B8EF8] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none'
        id='Discount'
        placeholder=''
        value={couponCode}
        onChange={e => setCouponCode(e.target.value)}
      />
      <label
        className='absolute -top-2 left-[10px] rounded-md px-2 text-xs text-slate-400 duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] peer-focus:bg-sky-300 peer-focus:text-xs peer-focus:text-sky-800 dark:peer-focus:text-sky-400 dark:peer-focus:bg-[#0F172A]'
        htmlFor='Discount'
      >
        Apply Coupon
      </label>
      <button
        className='rounded-full ml-2 bg-[#16BAC5] px-6 py-2 text-white '
        onClick={handleApplyCoupon}
      >
        Apply
      </button>
    </div>
  );
};
CouponForm.propTypes = {
  applyCoupon: PropTypes.func,
};
export default CouponForm;
