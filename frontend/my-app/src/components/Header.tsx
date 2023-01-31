import React from 'react';

function Header() {
    return (
         <div className="header">
          <h1 id="logo">CODIR</h1>
          <button className="cred" id="login">LOGIN</button>
          <button className="cred" id="signup">SIGN UP</button>
         </div>
      );
}

export default Header;