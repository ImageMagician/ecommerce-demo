const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`bg-black p-3 text-white`}>
            <div className="max-w-7xl mx-auto">
                <p>
                    { import.meta.env.VITE_APP_NAME } &copy; {currentYear}
                </p>
            </div>
        </footer>
    )
}

export default Footer;