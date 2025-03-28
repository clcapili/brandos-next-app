import React from "react";
import { NavLink } from "react-router-dom";

function ProfileNavigation({profile}) {

    return (
        <div className="navigation justify-content-start">

            {profile && profile.accounts &&
                <div className="ms-3 my-3">
                    {profile.accounts.length > 1 &&
                        <NavLink to="/" className="text-decoration-none">
                            <span className="glyph-chevron-left"></span> <span> Return to your Accounts</span>
                        </NavLink>
                    }
                    {profile.accounts.length == 1 &&
                        <NavLink to={'/' + profile.accounts[0]} className="text-decoration-none">
                            <span className="glyph-chevron-left"></span> <span> Return to Dashboard</span>
                        </NavLink>
                    }
                </div>
            }

            <ul className="left-side-nav">
                <li className="side-nav-item">
                    <NavLink to="/profile" end className="side-nav-link">
                        <span>Personal Info</span>
                    </NavLink>
                </li>
                <li className="side-nav-item">
                    <NavLink to="/profile/password" className="side-nav-link">
                        <span>Password</span>
                    </NavLink>
                </li>
                <li className="side-nav-item">
                    <NavLink to="/profile/photo" className="side-nav-link">
                        <span>Photo</span>
                    </NavLink>
                </li>

            </ul>
        </div>
    );
}

export default ProfileNavigation;
