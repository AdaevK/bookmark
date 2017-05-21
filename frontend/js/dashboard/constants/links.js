const links = {
  loginPath: "/login",
  registrationPath: "/registration",

  dashboardPath: "/dashboard",

  newFolderPath: "/dashboard/folders/new",
  editFolderPath: (id) => {
    if (!id) {
      id = ':id'
    }
    return `/dashboard/folders/${id}`
  },
}

export default links
