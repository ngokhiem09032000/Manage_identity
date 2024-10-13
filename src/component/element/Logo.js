import React from "react";

const Logo = (props) => {
  return (
    <div
      className="flex items-center text-2xl font-bold 
          italic bg-gradient-to-r from-text to-accent 
          bg-clip-text text-transparent hover:bg-gradient-to-r 
          hover:from-accent hover:to-text hover:scale-95 
          transition-all duration-300"
    >
      {props.name}
    </div>
  );
};

export default Logo;
