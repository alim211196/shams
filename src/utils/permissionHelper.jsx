export const hasPermission = (permissions = [], requiredPermission) => {
  if (!Array.isArray(permissions)) {
    console.warn("Invalid permissions format, expected an array.");
    return false; // Return false instead of true
  }
  return permissions.includes(requiredPermission);
};

export const hasAnyPermission = (permissions, requiredPermissions) => {
  return requiredPermissions.some((perm) => permissions.includes(perm));
};

// {hasPermission(userPermissions, "delete_staff") && (
//   <button>Delete Staff</button>
// )}
