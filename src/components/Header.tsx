import React from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };
    const menuItems = [
        { text: "Home", delay: "delay-100" },
        { text: "About", delay: "delay-200" },
        { text: "Projects", delay: "delay-300" },
        { text: "Contact", delay: "delay-400" }
    ];
    return (
        <div className='w-full flex justify-between pt-4'>
            <h3 className="text-2xl font-bold flex items-center space-x-1">
                Ren
                <span className="inline-block w-3 h-3 mt-2 bg-green-400 rounded-full"></span>
                ld
            </h3>
            <ul className='hidden md:flex space-x-4'>
                {menuItems.map((item) => (
                    <li>{item.text}</li>
                ))}
            </ul>
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none relative z-[1000] transition-transform duration-300"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black my-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </button>

                <div className={`fixed inset-0 z-[999] bg-white transition-all duration-500 flex items-center justify-center ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ul className="text-center text-2xl space-y-8">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer transform transition-all duration-500 ${item.delay} ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                onClick={() => toggleMenu()}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header