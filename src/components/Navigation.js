import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getProfilePhoto, Security } from '../helpers';
import AuthService from '../services/AuthService';
import { AccountData } from '../data';
import cn from "classnames";

function Navigation({ account, user, ...props }) {
    const location = useLocation();
    const [isProfileOpen, setProfileOpen] = useState(false);
   
    const authUser = AuthService.authUser;

    const handleProfileToggle = () => {
        setProfileOpen(!isProfileOpen);
    };

    return (
        <div className="navigation">
            <div>
                
                <ul className="left-side-nav">
                    <li className="side-nav-item">
                        <NavLink to={`/${account.id}`} end className="side-nav-link"><span>Dashboard</span></NavLink>
                    </li>

                    {Security.hasPermissions(account, 'cms', Security.Permission.MANAGE) &&
                        <li className="side-nav-item">
                            <NavLink to={`/${account.id}/content`} className="side-nav-link"><span>CMS</span></NavLink>

                            {(location.pathname.startsWith(`/${account.id}/content`) || location.pathname.startsWith(`/${account.id}/builder`)) &&
                                <div className="side-nav-link">
                                    <NavLink to={`/${account.id}/content`} end className="side-nav-link side-nav-link-sub"><span>Content</span></NavLink>
                                    <NavLink to={`/${account.id}/content/trash`} className="side-nav-link side-nav-link-sub"><span>Trash</span></NavLink>
                                </div>
                            }
                        </li>
                    }

                    {Security.hasPermissions(account, 'users', Security.Permission.MANAGE) &&
                        <li className="side-nav-item">
                            <NavLink to={`/${account.id}/users`} className="side-nav-link"><span>User Management</span></NavLink>

                            {location.pathname.startsWith(`/${account.id}/users`) &&
                                <div className="side-nav-link">
                                    <NavLink to={`/${account.id}/users`} end className="side-nav-link side-nav-link-sub"><span>Users</span></NavLink>
                                    <NavLink to={`/${account.id}/users/invites`} className="side-nav-link side-nav-link-sub"><span>Invites</span></NavLink>
                                </div>
                            }
                        </li>
                    }

                    {Security.hasPermissions(account, 'security', Security.Permission.MANAGE) &&
                        <li className="side-nav-item">
                            <NavLink to={`/${account.id}/security/groups`} className="side-nav-link"><span>Security</span></NavLink>

                            {location.pathname.startsWith(`/${account.id}/security`) &&
                                <div className="side-nav-link">
                                    <NavLink to={`/${account.id}/security/groups`} end className="side-nav-link side-nav-link-sub"><span>Groups</span></NavLink>
                                    <NavLink to={`/${account.id}/security/containers`} className="side-nav-link side-nav-link-sub"><span>Containers</span></NavLink>
                                    <NavLink to={`/${account.id}/security/access`} className="side-nav-link side-nav-link-sub"><span>Access</span></NavLink>
                                </div>
                            }
                        </li>
                    }

                    {Security.hasPermissions(account, 'extensions', Security.Permission.MANAGE) &&
                        <li className="side-nav-item">
                            <NavLink to={`/${account.id}/extensions`} className="side-nav-link"><span>Extensions</span></NavLink>
                        </li>
                    }

                    {Security.hasPermissions(account, 'settings', Security.Permission.MANAGE) &&
                        <li className="side-nav-item">
                            <NavLink to={`/${account.id}/settings`} className="side-nav-link">
                                <span>Settings</span>
                            </NavLink>

                            {location.pathname.startsWith(`/${account.id}/settings`) &&
                                <div className="side-nav-link">
                                    <NavLink to={`/${account.id}/settings/`} end className="side-nav-link side-nav-link-sub"><span>General</span></NavLink>
                                    {/*  <NavLink to={`/${account.id}/settings/sample-tables`} end className="side-nav-link side-nav-link-sub"><span>Sample Tables</span></NavLink> */} 
                                    <NavLink to={`/${account.id}/settings/menus`} className="side-nav-link side-nav-link-sub"><span>Menus</span></NavLink>
                                    <NavLink to={`/${account.id}/settings/login`} className="side-nav-link side-nav-link-sub"><span>Login</span></NavLink>
                                    <NavLink to={`/${account.id}/settings/sections`} className="side-nav-link side-nav-link-sub"><span>Sections</span></NavLink>
                                    <NavLink to={`/${account.id}/settings/themes`} className="side-nav-link side-nav-link-sub"><span>Themes</span></NavLink>
                                    <NavLink to={`/${account.id}/settings/extensions`} end className="side-nav-link side-nav-link-sub"><span>Extensions</span></NavLink>
                                    <NavLink to={`/${account.id}/settings/domains`} className="side-nav-link side-nav-link-sub"><span>Domains</span></NavLink>
                                </div>
                            }
                        </li>
                    }
                </ul>
            </div>
            
            <a className="profile-link" onClick={handleProfileToggle}>
                <img className="photo" src={getProfilePhoto(authUser)} />
                {authUser.name}
                <i className="glyph-chevron-right"></i>
            </a>
            
            <ProfileCard user={authUser} open={isProfileOpen}></ProfileCard>
 
        </div>
    );

}

function ProfileCard({user, open}) {

    const handleLogout = () => {
        AuthService.logout();
    }

    return (
        <div className={cn({ 'user-session': true, 'open': open })}>
            <div className="profile">
                <img className="photo" src={getProfilePhoto(user)} />
                <div className="details">
                    <div><strong>{user.name}</strong></div>
                    <div>{user.email}</div>
                </div>
            </div>

            <div className="options">
                <NavLink to="/profile">Settings</NavLink>

                {user.accounts && user.accounts.length > 1 && 
                    <Accounts></Accounts>
                }

                <a onClick={handleLogout}>Log out</a>
            </div>
        </div>);

}

function Accounts() {
    const [isAccountsOpen, setAccountsOpen] = useState(false);
    const { data: accounts, loading, error } = AccountData.useFindAll();

    const handleAccountsToggle = () => {
        setAccountsOpen(!isAccountsOpen);
    };

    return accounts && accounts.length > 1 && (
        <>
            <a onClick={handleAccountsToggle}>Accounts <span className="glyph glyph-chevron-right"></span></a>
        
            <div className={cn({ 'accounts': true, 'open': isAccountsOpen })}>
                {accounts.map(
                    ({ id, name }, index) => (
                        <a key={index} href={'/' + id}>
                            <span className="name">{name}</span>
                        </a>
                    )
                )}
            </div>
        </>
    );

}

export default Navigation;
