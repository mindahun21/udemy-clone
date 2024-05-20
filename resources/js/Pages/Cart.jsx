import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import './Cart.css';

export default function Cart({ auth }) {
     const coursedetails= ['84 hours on-demand video',
                        '9 articles','2 downloadable resources', 'Access on mobile and TV',
                        'Full lifetime access','Certificate of completion'
  ];
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="shoping-cart" />

            {/* implementation starts */}
            <div className="cart-container">
          <div className="content">
            <div className="price-details">
                <span className="price">$9.99</span>
                <span className="updated-price">$74.99</span>
                <span className="price-off">87% off</span>
            </div>
            <div className="days-left">2 days left at this price!</div>
            <div className="buttons-container">
            <div className="buttons-box">
                <button className="go-to-cart-button">Go to Cart</button>
                
                    <button className="heart-button">❤️</button></div>
                    <button className="buy-now-button">Buy Now</button>
                
            </div>
            <div className="money-back-guarantee">30-Day Money-back guarantee</div>
            <div className="course-details">
                <p className="courses-includes">This course includes:</p>
                <ul className="course-details-list">
                  {coursedetails.map((include,index)=>(
                    <li key={index}>{include}</li>
                  ))}
                </ul>
            </div>
            <div class="action-buttons">
        <button class="share-button button-with-bottom-line">Share</button>
        <button class="gift-button button-with-bottom-line">Gift this course</button>
        <button class="apply-coupon-button button-with-bottom-line">Apply Coupon</button>
    </div>
            <div className="coupon-details"><b>LEADERSALE24A</b> is applied Udemy coupon
                        <button class="exit-button">X</button>
                             </div>
            <div className="enter-coupon">
                <input type="text" placeholder="Enter Coupon" />
                <button className="apply-button">Apply</button>
            </div>
            
            <div className="team-access"><b>Training 5 or more people?</b><pre>Get your team access to 2500+ top udemy</pre> <pre>courses anytime, anywhere.</pre></div>
            <button className="udemy-business-button">Try Udemy Business</button>
            </div> </div>
            

            {/* implementation ends */}

        </AuthenticatedLayout>
    );
}
export default Cart;
