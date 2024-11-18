"use client"
import "./Reader.css"
export function Reader(){
    function onclick(){
        console.log("Hello Word")
    }
    return(
<>
<nav id="nav-website" onClick={()=>{onclick}}>
  <ul id="first-level-nav">
    <li className="logo">
      <a href="/">
       { /*<img src="/themes/openweathermap/assets/img/logpngo_white_cropped." alt="logo">*/}
      </a>
    </li>
    <li id="hamburger">
    {/*}  <img src="/themes/openweathermap/assets/img/owm_icons/icon_hamburger.svg" alt="icon hamburger">*/}
    </li>
    <li id="desktop-menu">
  {/*}    <form role="search" action="/find" method="get">
        <input type="text" name="q" placeholder="Weather in your city">
        <input type="submit" className="submit">
      </form> */}
      <ul>
        <li>
          <a href="/guide">Guide</a>
        </li>
        <li>
          <a href="/api">API</a>
        </li>
        <li>
          <a href="https://dashboard.openweather.co.uk/" target="_blank">Dashboard</a>
        </li>
        <li>
          <a href="https://home.openweathermap.org/marketplace" target="_blank">Marketplace</a>
        </li>
        <li>
          <a href="/price">Pricing</a>
        </li>
        <li>
          <a href="/weathermap">Maps</a>
        </li>
        <li>
          <a href="/our-initiatives">Our Initiatives</a>
        </li>
        <li>
          <a href="/examples">Partners</a>
        </li>
        <li>
          <a href="https://openweather.co.uk/blog/category/weather" target="_blank">Blog</a>
        </li>
        <li>
          <a href="https://openweather.co.uk" className="marketplace" target="_blank">For Business</a>
        </li>
                <li className="user-li"><a href="https://openweathermap.org/home/sign_in">Sign in</a></li>
                <li className="with-dropdown">
          <div id="support-dropdown">Support</div>
          <ul className="dropdown-menu" id="support-dropdown-menu">
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/appid">How to start</a></li>
            <li><a href="/chat">Ulla, OpenWeather AI assistant</a></li>
            <li><a href="https://home.openweathermap.org/questions" target="_blank">Ask a question</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  <ul id="mobile-menu">
    <li>
{/*}      <form role="search" action="/find" method="get">
        <input type="text" name="q" placeholder="Weather in your city">
        <input type="submit" className="submit">
      </form>   */}
    </li>
    <li>
      <a href="/guide">Guide</a>
    </li>
    <li>
      <a href="/api">API</a>
    </li>
    <li>
      <a href="https://dashboard.openweather.co.uk/" target="_blank">Dashboard</a>
    </li>
    <li>
      <a href="https://home.openweathermap.org/marketplace" target="_blank">Marketplace</a>
    </li>
    <li>
      <a href="/price">Pricing</a>
    </li>
    <li>
      <a href="/weathermap">Maps</a>
    </li>
    <li>
      <a href="/our-initiatives">Our Initiatives</a>
    </li>
    <li>
      <a href="/examples">Partners</a>
    </li>
    <li>
      <a href="https://openweather.co.uk/blog/category/weather" target="_blank">Blog</a>
    </li>
    <li>
      <a href="https://openweather.co.uk" className="marketplace" target="_blank">For Business</a>
    </li>
    <li>
      <a href="https://home.openweathermap.org/questions">Ask a question</a>
    </li>
        <li><a href="https://openweathermap.org/home/sign_in">Sign in</a></li>
      </ul>
</nav>
</>
    );
}