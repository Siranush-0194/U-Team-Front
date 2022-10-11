import React from "react"
import { Link } from "react-router-dom"


const Navbar = ({ }) => {
    const menu = [
      { alias: '', name: 'Home' },
      { alias: 'product', name: 'Product' },
      { alias: 'about', name: 'Abount' }
    ]
    return (<Link key={nav.alias} to={`/${nav.alias}`}>{nav.name}</Link>)
}

export default Navbar;