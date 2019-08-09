import Nav from '../components/nav'
import DonateForm from '../components/donateform'
import PaypalExpressBtn from '../components/PayPalExpressCheckOut';
import Head from '../components/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { Component } from 'react'
import '../static/styles/main.scss'

const CLIENT = {
  sandbox: '125465172765',
  production: 'xxxXXX',
}
let currency = 'USD'; // or you can set this value from your props or state   
let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout 
       

class Donate extends Component {
  render () {

        const onSuccess = (payment) => {
            console.log("Your payment was succeeded!", payment);
        }         
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup! 
            console.log('You have cancelled the payment!', data);
        }         
        const onError = (err) => {
         // The main Paypal's script cannot be loaded or somethings block the loading of that script! 
                    console.log("Error!", err);
        // Since the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js" 
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear      
        }               
         
    return (
      <div>
        <Head title='Donate' />
        <Nav />

        <div className='w-100 h-100 flex'>
          <div className='w-100 h-100 absolute bg-tf-gray o-10 z-minus-1' />
          { process.browser && <div className='flex flex-column m-auto justify-between pa3 pa4-ns'>
            <div className='flex flex-column pa4-ns pa2 pb4 tf-lato tc mv-auto'>
              <div className='tf-dark-gray ts-title tf-oswald fl pb3'>
                Fund Teachers. Help Students.
              </div>
              <div className='tf-gray tf-lato-lite pa1 w-75-ns m-auto'>
                With 100 percent of your donation funding public school teachers in need, you can
                give knowing that your entire gift will help equip classrooms and help students.
              </div>
            </div>
            <StripeProvider apiKey='pk_live_FYwjfNktzq3upZRFbxA9hyc8'>
              <div className='flex flex-column w5-ns w-100 m-auto'>
                <Elements>
                  <DonateForm />
                </Elements>
              </div>
            </StripeProvider>
            <div className='w-120-ns m-auto'>
              <Elements>
                    <PaypalExpressBtn 
                      client={CLIENT}
                      currency={currency}
                      total={total}
                      onError={onError}
                      onSuccess={onSuccess}
                      onCancel={onCancel}
                    />
                </Elements>
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default Donate
