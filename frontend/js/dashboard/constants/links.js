const links = {
  loginPath: "/login",
  registrationPath: "/registration",

  dashboardPath: "/dashboard",

  newFolderPath: "/dashboard/folders/new",
  editFolderPath: (id) => {
    if (!id) id = ':id'
    return `/dashboard/folders/${id}/edit`
  },
  showFolderPath: (id) => {
    if (!id) id = ':id'
    return `/dashboard/folders/${id}`
  },

  newFolderLinkPath: (folderId) => {
    if (!folderId) folderId = ':folder_id'
    return `/dashboard/folders/${folderId}/links/new`
  }
}

export default links
