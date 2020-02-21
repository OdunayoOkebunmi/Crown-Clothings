import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 0.275115;
  const publishableKey = 'pk_test_njE796lB7WwtdaAEZhgDizZ700kknmdltj';
  const onToken = (token) => {
    console.log(token)
    alert('Payment Successful')
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='CROWN Clothing'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={ `Your total is ₦${price}` }
      amount={ priceForStripe }
      panelLabel='Pay Now'
      token={ onToken }
      stripeKey={ publishableKey }
    />
  )

}

export default StripeCheckoutButton;