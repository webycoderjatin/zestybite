import React from "react";
import logo from "../assets/logo.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  FaClock,
  FaMoneyBillWave,
  FaRegFileAlt,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const DeliveryPartners = () => {
  return (
    <div>
      <nav className="partners-nav">
        <span className="logo">
          <img src={logo} alt="" height={50} />
          <h3>ZestyBites Partners</h3>
        </span>
        <ul>
          <a href="">
            <li>Home</li>
          </a>
          <a href="">
            <li>About</li>
          </a>
          <a href="">
            <li>How it Works</li>
          </a>
          <a href="/delivery-partners-registration">
            <li>Join as a Partner</li>
          </a>
          <a href="">
            <li>FAQs</li>
          </a>
          <a href="">
            <li>Contact Us</li>
          </a>
        </ul>
      </nav>

      <div className="partners-hero">
        <DotLottieReact
          src="https://lottie.host/5e0106a5-a84b-4830-83d5-46474c5ce173/pPQoGn165J.lottie"
          loop
          autoplay
          style={{ height: 500, width: 1000 }}
          className="lottie-partners"
        />
        <div className="partners-hero-text">
          <h1 className="orange">Join ZestyBites as a Delivery Partner</h1>
          <h3>Deliver Joy. Earn on Your Terms.</h3>
          <p className="gray">
            At ZestyBites, we don’t just deliver food—we deliver smiles. As a
            Delivery Partner, you're the heartbeat of our service, bringing
            fresh, delicious bites from local kitchens right to the customer’s
            doorstep.
          </p>

          <a href="/delivery-partners-registration"><button>Join Now</button></a>
        </div>
      </div>

      <div className="partners-why">
        <h1 className="orange">Why Ride with Us?</h1>
        <ul>
          <li>
            <FaClock /> Flexible Hours – Work when you want, as much as you
            want.
          </li>
          <li>
            <FaMoneyBillWave /> Attractive Earnings – Get paid weekly with
            exciting incentives.
          </li>
          <li>
            <FaRegFileAlt /> Easy Onboarding – Sign up with minimal paperwork.
          </li>
          <li>
            <FaShieldAlt /> Safety First – Insurance coverage and support during
            deliveries.
          </li>
          <li>
            <FaHeadset /> Supportive Team – We’ve got your back with 24/7
            assistance.
          </li>
        </ul>
      </div>

      <div className="partners-who">
        <h1 className="orange">Who Can Join?</h1>
        <div className="anime-outer-cont">

        <div className="anime-cont">

        <DotLottieReact
          src="https://lottie.host/2faedde7-90c0-457e-b12b-c709f890ccc0/hCL0n6tiK8.lottie"
          loop
          autoplay
          style={{ height: 200, width: "100%" }}
        />
        <h3>Age 18+</h3>
        </div>
        <div className="anime-cont">

        <DotLottieReact
          src="https://lottie.host/9fb76cc9-2223-43b7-ab76-9293411b4193/shs582lzpA.lottie"
          loop
          autoplay
          style={{ height: 200, width: "100%" }}
        />
        <h3>Valid ID & Address Proof</h3>
        </div>
        <div className="anime-cont">

        <DotLottieReact
      src="https://lottie.host/1f72803c-c956-4f45-8724-f9cde7a6e279/uk7CYvFSOC.lottie"
          loop
          autoplay
          style={{ height: 200, width: "100%" }}
        />
        <h3>Two-Wheeler with Driving License</h3>
        </div>
        <div className="anime-cont">

        <DotLottieReact
      src="https://lottie.host/583f4171-feb2-4d03-aba4-579b7550a811/wIlcZYqHgl.lottie"
          loop
          autoplay
          style={{ height: 200, width: "100%" }}
        />
        <h3>Smartphone with GPS</h3>
        </div>
        </div>
      </div>

      <div className="partners-join">
        <h1>Ready to Roll?</h1>
        <p>Become a part of ZestyBites and start earning today.</p>
        <p>Sign up now. Let’s deliver happiness, together.</p>
       <a href="/delivery-partners-registration"><button>Sign Up</button></a> 
        </div>
    </div>
  );
};

export default DeliveryPartners;
