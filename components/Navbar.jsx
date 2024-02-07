'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@public/images/logo.png'
import UnknownUserLogo from '@public/images/unknown.png' // Import the unknown logo image
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])

    return (
        <nav className='Navbar'>
            <Link href='/' className='NavbarLogoLink'>
                <Image
                    src={Logo}
                    alt='Logo'
                    className='NavbarLogo' />
            </Link>

            {/* Desktop Navigation */}
            <div className="LoginBtn">
                {session?.user ? (
                    <div className="NavbarContainer2">
                        <Link href='/create-prompt' style={{ textDecoration: 'none' }}>
                            <button className="createPostBtn">
                                Create Post
                            </button>
                        </Link>

                        <button type='buttonn' onClick={signOut} className='SignOutBTN'>
                            Sign Out
                        </button>
                        <Link href='/profile'>
                            {/* Use session?.user.image if available, otherwise use the unknown logo image */}
                            <Image src={session?.user.image || UnknownUserLogo.src} alt='Logo' className='ProfilePhotoImg' width={200} height={200} />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='signInBtn'>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="MobileMenuBar">
                {session?.user ? (
                    <>
                        <Image src={session?.user.image || UnknownUserLogo.src}
                            width={200}
                            height={200}
                            alt='Logo'
                            className='NavbarLogoMobile'
                            onClick={() => setToggleDropdown((prev) => !prev)} />
                        {toggleDropdown && (
                            <div className="NavbarDropdown">
                                <Link href='/profile'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href='/create-prompt'
                                    className='dropdown_link'
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type='buttonn' onClick={() => {
                                    setToggleDropdown(false); signOut();
                                }} className='DropDownSignOutBTN'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='signInBtn'>
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar
