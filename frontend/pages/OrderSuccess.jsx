import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const OrderSuccess = () => {
  return (

    <div className='order-sucess'>
        
    <DotLottieReact
      src="https://lottie.host/57914f36-57b7-461e-83f7-307f9fcd4d0e/RqcdRbOh1F.lottie"
      autoplay
      style={{ height: 200, width: 200 }}
      className='lottie-success'
    />
    <h2 className='orange'>Order Placed Successfully!</h2>
    <p className='gray order-p-align'>Thank you for your purchase. Your order has been confirmed and is being processed. You’ll receive updates shortly.</p>
    <a href="/dashboard/orders"><button>View Orders</button></a>
    </div>
  );
};

export default OrderSuccess
