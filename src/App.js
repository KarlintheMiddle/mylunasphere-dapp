import './App.css';
import React,{Component} from "react";
import logo from './img/lunasphere.png';
import Web3 from 'web3';

import TokenAbi from './contracts/tokenabi.json';



const Moralis  = require('moralis/node');
const web3 = new Web3(window.ethereum)



class App extends Component {

  


componentDidMount(){
  Moralis.initialize("Zui8PUN4j9XzLudxaVhmRtOkFpYOw6QEAN5HgGWc");
  Moralis.serverURL = "https://qni07wc4t0vc.usemoralis.com:2053/server";



  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLink = document.querySelectorAll(".nav-link");
  const btn = document.querySelectorAll(".cta");
  
  hamburger.addEventListener("click", mobileMenu);
  navLink.forEach((n) => n.addEventListener("click", closeMenu));
  
  function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
  
  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }

  var account;
var _bnbBalance;
async function login() {
  try {
    const currentUser = Moralis.User.current();
    if (!currentUser) {
      currentUser = await Moralis.Web3.authenticate().then(function (user) {
        account = user.get("ethAddress");
        console.log(user.get("ethAddress"));
        // 0xd9145CCE52D386f254917e481eB44e9943F39138
        const tokenContract = new web3.eth.Contract(
          TokenAbi.abi,
          "0xd9145CCE52D386f254917e481eB44e9943F39138"
        );
        console.log(tokenContract)
        getAccount();
      });
    } else if (currentUser) {
      currentUser = await Moralis.User.currentAsync().then(function (user) {
        // do stuff with your user
        account = user.get("ethAddress");
        console.log(user.get("ethAddress"));
        getAccount();
      });
    }
    // show account
  } catch (error) {}
}

async function logout() {
  await Moralis.User.logOut();
  console.log("logged out");
}

const ethereumButton = document.querySelector(".enableEth");
const showAccount = document.querySelector(".showAccount");
const showBNBBalances = document.querySelector(".showBNBBalances");
const logoutBtn = document.querySelector(".logout");

ethereumButton.addEventListener("click", () => {
  login();
});

showAccount.addEventListener("click", () => {
  console.log("Log-out button click");
  dropdownFunction();
});

logoutBtn.addEventListener("click", () => {
  logout();
  window.location.reload();
});

function dropdownFunction() {
  document.getElementById("addressDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".showAccount")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

async function getAccount() {
  console.log("getacount");
  document.getElementById("btnhide").classList.add("hide");
  document.getElementById("hideAcc").classList.remove("hide");
  document.getElementById("hideAcc").classList.add("show");
  getBalance();
  showAccount.innerHTML = account;

  // Moralis.Web3.authenticate().then(function (user) {
  //   console.log(user.get("ethAddress"));
  //   account = user.get("ethAddress");
  //   console.log("Running Authenticate");
  //   showAccount.innerHTML = account;
  // });
}

async function getBalance() {
  //get bnb blance
  const bnbBalances = await Moralis.Web3.getERC20({
    chain: "bsc",
    symbol: "BNB",
  });
  let decbnbBalances = Web3.utils.fromWei(bnbBalances.balance, "ether");
  _bnbBalance = decbnbBalances + " BNB";

  showBNBBalances.innerHTML = "Balance: " + _bnbBalance;
}

// Set the date we're counting down to
      var countDownDate = new Date("Sept 9, 2021 00:00:00").getTime();

      // Update the count down every 1 second
      var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("countdown").innerHTML =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "EXPIRED";
        }
      }, 1000);
}  



render(){
  return (
    
    <div className="App">
    <div className="navigation" id="mynavigation">
      <header className="headernav" id="headerid">
        <nav className="navbar">
          <a className="logo" href="">Luna Sphere</a>
          <ul className="nav-menu" id="navMenu">
            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Contacts</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Projects</a></li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
          </ul>
          <div className="btn-holder">
            <a href="#" className="btn" id="btnhide"
              ><button id="hideEth" className="enableEth">Connect</button></a>
            <h2 id="hideAcc" className="hide">
              <div className="dropdown">
                <button id="showAcc" className="showAccount"></button>
                <div id="addressDropdown" className="dropdown-content">
                  <a href="#" className="logout">Log-out</a>
                </div>
              </div>
            </h2>
          </div>
          <div className="hamburger-holder">
            <div className="hamburger" id="hamburgerClick" onclick="myFunction()">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <div className="container">
      <div className="body">
        <div className="body-right">
          <h1 className="glow">Luna Sphere Token</h1>
          <br />
          <p>Get out the way</p>
          <br />
          <div className="body-right-button">
            <input type="text" value="0x42062922nog2nogasdasdwasd5346dfgj2" readonly ds />
            <a href="#" className="body-right-btn"
              ><button className="button-body">Buy on Pancake Swap</button></a>
          </div>
        </div>
        <div className="body-logo">
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="body-2">
        <div className="presale">
          <h1 className="presale-title">Presale</h1>
          <p>Date: September 09, 2021</p>
          <p id="countdown"></p>
        </div>
        <div className="presale-info">
          <div className="total-remaining">
            <h1>10000000000 LNS remaining</h1>
            <div className="progressbar">
              <div id="myProgress">
                <div id="myBar">100%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="balance-section">
          <form className="buySection" action="">
            <div className="fromBNB">
              <h1>From: BNB</h1>
              <label className="showBNBBalances" for="inputBNB">Balance: </label>
              <input type="number" name="inputBNB" id="inputBNB" className="inputBNB" />
            </div>
            <div className="toLNS">
              <h1>To: LNS</h1>
              <label className="showLNSBalances" for="inputLNS">Balance: </label>
              <input type="number" name="inputLNS" id="inputLNS" className="inputLNS" />
            </div>
          </form>
        </div>
      </div>
    </div>
    
      
    </div>
  );
}
}

export default App;
