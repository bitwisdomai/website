import React from 'react'
import logo from "../../assets/Logo/BitWisdom_Secondary_Logomark_Registered.png";

const Banner = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center px-28">
      <div className="flex gap-8">
        <ul>
          
        </ul>
        <ul>instagram</ul>
        <ul>twitter</ul>
        <ul>picsart</ul>
      </div>
      <div className="w-30 h-18 flex items-center">
        <img src={logo} />
      </div>
      <div className="flex gap-4">
        <ul>search</ul>
        <div>|</div>
        <ul>Language</ul>
      </div>
    </div>
  );
}

export default Banner