import React, { Component } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import AuthService from './services/AuthService';

// Pages
import Dashboard from "./pages/dashboard/Dashboard";

import Content from "./pages/content/Content";
import ContentCreate from "./pages/content/Create";
import ContentUpdate from "./pages/content/Update";
import ContentTrash from "./pages/content/Trash";
import Versions from "./pages/content/Versions";

import Profile from "./pages/profile/Profile";
import Photo from "./pages/profile/Photo";
import Password from "./pages/profile/Password";

import PasswordForgot from "./pages/password/Forgot";
import PasswordReset from "./pages/password/Reset";

import Plans from "./pages/register/Plans";
import Register from "./pages/register/Register";
import RegisterInvite from "./pages/register/RegisterInvite";

import PaymentConfirmation from "./pages/payment/PaymentConfirmation";
import Checkout from "./pages/payment/Checkout";

import Users from "./pages/users/Users";
import User from "./pages/users/User";
import UpdateUser from "./pages/users/Update";
import InviteUser from "./pages/users/InviteUser";
import Invites from "./pages/users/Invites";

import Access from "./pages/security/access/Access";

import Containers from "./pages/security/containers/Containers";
import CreateContainers from "./pages/security/containers/Create";
import UpdateContainers from "./pages/security/containers/Update";

import Groups from "./pages/security/groups/Groups";
import CreateGroup from "./pages/security/groups/Create";
import UpdateGroup from "./pages/security/groups/Update";

import Extensions from "./pages/extensions/Extensions";
import ExtensionSettings from "./pages/extensions/Settings";

import Settings from "./pages/settings/general/General";
import SampleTables from "./pages/settings/Settings";
import LoginSettings from "./pages/settings/login/LoginSettings";
import Menus from "./pages/settings/menus/Menus";
import CreateMenu from "./pages/settings/menus/Create";
import UpdateMenu from "./pages/settings/menus/Update";
import Sections from "./pages/settings/sections/Sections";
import Themes from "./pages/settings/themes/Themes";
import ThemeDetail from "./pages/settings/themes/ThemeDetail";
import ManageExtensions from "./pages/settings/extensions/Extensions";

import Domains from "./pages/settings/domains/Domains";
import CreateDomain from "./pages/settings/domains/Create";

import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import NotFound from "./pages/NotFound";

// Layouts
import RootLayout from "./layouts/RootLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AccountLayout from "./layouts/AccountLayout";
import ProfileLayout from "./layouts/ProfileLayout";




class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        AuthService.observable.subscribe(x => this.setState({ authUser: x }));
    }

    render() {
        
        const router = createBrowserRouter(
            createRoutesFromElements(

                <Route element={<RootLayout />}>
                    <Route path="/login" element={<Login />} />
                    
                    <Route path="/password/forgot" element={<PasswordForgot />} />
                    <Route path="/password/reset" element={<PasswordReset />} />

                    <Route path="/plans" element={<Plans />} />
                    
                    <Route path="/register/:plan" element={<Register />} />
                    <Route path="/register/invite" element={<RegisterInvite />} />
                    
                    <Route element={<ProtectedLayout />}>
                        <Route index element={<Accounts />} />

                        <Route path="/register/checkout" element={<Checkout />} />
                        <Route path="/register/payment-confirmation" element={<PaymentConfirmation />} />

                        <Route path="/profile" element={<ProfileLayout />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/profile/password" element={<Password />} />
                            <Route path="/profile/photo" element={<Photo />} />
                        </Route>

                        <Route path="/:accountId" element={<AccountLayout />}>
                            <Route index element={<Dashboard />} />

                            <Route path="/:accountId/content/:id?" element={<Content />} />
                            <Route path="/:accountId/content/versions/:id" element={<Versions />} />
                            <Route path="/:accountId/content/create/:schema/:parentId?" element={<ContentCreate />} />
                            <Route path="/:accountId/content/update/:id" element={<ContentUpdate />} />
                            <Route path="/:accountId/content/trash" element={<ContentTrash />} />

                            <Route path="/:accountId/users" element={<Users />} /> 
                            <Route path="/:accountId/users/:id" element={<User />} /> 
                            <Route path="/:accountId/users/:id/update" element={<UpdateUser />} /> 
                            <Route path="/:accountId/users/invite" element={<InviteUser />} />
                            <Route path="/:accountId/users/invites" element={<Invites />} /> 

                            <Route path="/:accountId/security/access" element={<Access />} /> 
                            
                            <Route path="/:accountId/security/containers" element={<Containers />} /> 
                            <Route path="/:accountId/security/containers/create" element={<CreateContainers />} /> 
                            <Route path="/:accountId/security/containers/update/:id" element={<UpdateContainers />} /> 

                            <Route path="/:accountId/security/groups" element={<Groups />} /> 
                            <Route path="/:accountId/security/groups/create" element={<CreateGroup />} /> 
                            <Route path="/:accountId/security/groups/update/:id" element={<UpdateGroup />} /> 

                            <Route path="/:accountId/extensions" element={<Extensions />} />
                            <Route path="/:accountId/extensions/settings/:id/:pageIndex?" element={<ExtensionSettings />} />
                            
                            <Route path="/:accountId/settings" element={<Settings />} /> 
                            
                            <Route path="/:accountId/settings/sample-tables" element={<SampleTables />} /> 
                            
                            <Route path="/:accountId/settings/menus" element={<Menus />} /> 
                            <Route path="/:accountId/settings/menus/create" element={<CreateMenu />} /> 
                            <Route path="/:accountId/settings/menus/update/:id" element={<UpdateMenu />} /> 

                            <Route path="/:accountId/settings/sections" element={<Sections />} /> 
                            
                            <Route path="/:accountId/settings/login" element={<LoginSettings />} /> 

                            <Route path="/:accountId/settings/themes" element={<Themes />} />
                            <Route path="/:accountId/settings/themes/:id" element={<ThemeDetail />} />

                            <Route path="/:accountId/settings/extensions" element={<ManageExtensions />} />

                            <Route path="/:accountId/settings/domains" element={<Domains />} /> 
                            <Route path="/:accountId/settings/domains/create" element={<CreateDomain />} /> 

                        </Route>

                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            )
        );

        return (
            <RouterProvider router={router} />
        );
    }

}

export default App;