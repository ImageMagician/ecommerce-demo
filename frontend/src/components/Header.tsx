import { useState } from 'react';
// import { faShoppingCart, faUsers } from '@fortawesome/free-solid-svg-icons';

type NavLink = {
    href: string,
    label: string,
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const links: NavLink[] = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" }
    ];

    return (
        <header className="bg-gray-300">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                <h1 className={`text-2xl px-4 py-2`}>ProShop Ecommerce</h1>
                <nav className={`relative`}>
                    <button onClick={toggleMenu} aria-expanded={isOpen} className={`border-none px-6 py-2 rounded hover:text-blue-500 cursor-pointer`}>
                        Menu
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
                </nav>
            </div>
        </header>
        )
}

export default Header;