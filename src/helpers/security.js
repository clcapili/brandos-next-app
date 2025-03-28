
const Permission = {
	MANAGE: 1,
	READ: 2,
	WRITE: 4
}

function hasPermissions(account, container, permission) {
    if (!account.sec[container])
        return false;

   return (account.sec[container] & permission) == permission;
}

function getPermissionName(value) {
    return Object.keys(Permission).find(key => Permission[key] === value);
}

export default { 
    Permission,
    hasPermissions,
    getPermissionName
};