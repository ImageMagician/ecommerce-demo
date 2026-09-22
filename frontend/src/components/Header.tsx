import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store'

type NavLink = {
    href: string,
    label: string,
}

const Header = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);

    const [isOpen, setIsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const mobileMenuToggle = () => {
        if (mobileOpen) {
            setIsOpen(true);
        }
        setMobileOpen(!mobileOpen);
    }

    const links: NavLink[] = [
        { href: "/account", label: "Account" },
        { href: "/orders", label: "Orders" },
        { href: "/logout", label: "Logout" },
    ];

    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <h1 className={`text-2xl px-4 py-4`}>
                    <Link to="/">
                        <img src="/ts-logo-text.svg" alt="TechStash logo" className={`hidden md:block w-60 h-auto`} />
                        <img src="/ts-logo.svg" alt="TechStash" className={`md:hidden w-8 h-auto`} />
                    </Link>
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-end gap-1 px-2">
                    <button className={`${mobileOpen ? 'hidden' : 'block'} ml-auto sm:hidden border-2 border-gray-500 hover:border-gray-700 text-gray-500 hover:text-gray-700 rounded px-0.5`}
                            onClick={mobileMenuToggle}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <nav className={`z-50 fixed top-0 bottom-0 right-0 p-3 bg-blue-900/85 sm:bg-transparent text-white sm:text-gray-500 w-auto transition-all duration-300 sm:static sm:block sm:flex gap-2 items-center ${mobileOpen ? 'left-0' : 'left-full'}`}>
                        <div className={`text-end mb-1 block sm:hidden`}>
                            <button className={`block ml-auto border-2 border-white rounded px-1.5`}
                                    onClick={mobileMenuToggle}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="relative">
                            <button onClick={toggleMenu} aria-expanded={isOpen} className={`border-b border-b-white/30 w-full sm:w-auto text-start sm:border-none p-2 sm:rounded hover:text-blue-700 cursor-pointer`}>
                                <FontAwesomeIcon icon={faUserCircle} />
                                <span className="ml-1 hidden sm:inline">Sign In</span>
                            </button>
                            {isOpen && (
                                <ul className={`sm:absolute sm:top-full sm:left-0 sm:border sm:border-gray-300 sm:bg-white sm:rounded sm:shadow`}>
                                    {links.map((link:any) => (
                                        <li key={link.href}>
                                            <Link to={link.href} className={`block pl-6 pr-4 sm:px-4 py-2 text-white border-b border-b-white/30 sm:border-0 sm:text-gray-500 hover:text-gray-800 hover:bg-gray-100`}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <Link to="/cart" className="hover:text-blue-700 p-2 sm:p-0 inline-block relative">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className="hidden sm:inline-block ml-1">Cart</span>
                            { cartItems.length > 0 && (
                                <span className="bg-white rounded-full px-1 py-0 text-black text-[8px] absolute -top-1 -left-1 border border-gray-500">
                                    { cartItems.length }
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
        )
}

export default Header;