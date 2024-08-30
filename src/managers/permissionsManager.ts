export const privTypes = {
    usingModTask: 0, // has access to add points in modTasks
    taskAdministration: 1, // has access to create and delete tasks
    taskModeration: 2, // has access to accept and reject tasks
    modInvitations: 3, // has access to invitation new moderators
    adminInvitations: 4, // has access to invitation new admins
    adminPanel: 5, // has access to admin panel
    preview: 6,
}

export function hasAccess(privId: number, actualPermissions: number[]): boolean {    
    return !!actualPermissions[privId];
}