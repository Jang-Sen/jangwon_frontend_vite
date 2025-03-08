import React from 'react';
import {RxChevronDown, RxMix} from "react-icons/rx";
import {Link} from "react-router-dom";
import {Menu} from "@headlessui/react";

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="flex items-center space-x-3">

                    <figure className="text-lg">
                        <RxMix/>
                    </figure>
                    <h2 className="text-xl font-bold">Hello World</h2>
                </Link>
                <div className="flex items-center space-x-2">
                    <Menu as="div" className="relative">
                        <Menu.Button className="inline-flex mt-1.5">
                            <img
                                src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                                alt="user-image"
                                className="nav__menu-image"
                            />
                            <div className="nav__menu-icon">
                                <RxChevronDown/>
                            </div>
                        </Menu.Button>
                    </Menu>
                </div>
            </nav>
        </header>
    );
};

export default Header;