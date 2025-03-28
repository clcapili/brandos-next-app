import config from 'config';

const getProfilePhoto = (user) => {
    const name = user.name ? user.name : user.firstName+ ' '+user.lastName;
    return (user && user.photo) ? config.storageDomain + user.photo : 'https://ui-avatars.com/api/?background=00B4ED&color=fff&name='+name;
}

export default getProfilePhoto;