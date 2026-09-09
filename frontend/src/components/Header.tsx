import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

type NavLink = {
    href: string,
    label: string,
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links: NavLink[] = [
        { href: "/account", label: "Account" },
        { href: "/orders", label: "Orders" },
        { href: "/logout", label: "Logout" },
    ];

    return (
        <header className="border-b border-gray-200">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <h1 className={`text-2xl px-4 py-4`}>
                    <a href="/">
                        <img src="/ts-logo-text.svg" alt="TechStash logo" className={`w-[240px] h-auto`} />

                    </a>
                </h1>
                <div className="flex items-center justify-between gap-1">
                    <nav className={`flex gap-2 items-center`}>
                        <a href="/products" className={`hover:text-blue-600`}>Products</a>
                        <div className="relative">

                        <button onClick={toggleMenu} aria-expanded={isOpen} className={`border-none px-6 py-2 rounded hover:text-blue-700 cursor-pointer`}>
                            Account
                        </button>
                        {isOpen && (
                            <ul className={`absolute top-full left-0 border border-gray-300 bg-white rounded shadow`}>
                                {links.map((link:any) => (
                                    <li key={link.href}>
                                        <a href={link.href} className={`block px-4 py-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100`}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        </div>
                        <a href="/cart" className="hover:text-blue-700">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </a>
                    </nav>
                </div>
            </div>
        </header>
        )
}

export default Header;