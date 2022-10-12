import './Navbar.css';


export default function Navbar() {
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
       U-Team
      </a>      
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}