import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileNavigation } from '../components';
import { ProfileData } from '/src/data';

const ProfileLayout = () => {

    const { data: profile, loading, error } = ProfileData.useUserProfile();

    return (
        <>
            {loading && (
                <div className="row">
                    <div className="col-lg-6">A moment please...</div>
                </div>
            )}

            {error && (
                <div>{`There is a problem fetching the data - ${error}`}</div>
            )}

            {profile && (
                <>
                    <ProfileNavigation profile={profile} />
                    <Outlet context={[profile]} />
                </>
            )}
        </>
    );
}

export default ProfileLayout;
