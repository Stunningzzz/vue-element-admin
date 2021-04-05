export default {
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  asideNavStatus: state => state.app.asideNavStatus,
  asideNavIsCollapsing: state => state.app.asideNavIsCollapsing,
  breadCrumbsExcludePath: state => state.app.breadCrumbsExcludePath,
  globalSize: state => state.app.globalSize,
  fixedHeader: state => state.app.fixedHeader,
  sidebarLogo: state => state.app.sidebarLogo,
  accessRoutes: state => state.permission.accessRoutes,
  addRoutes: state => state.permission.addRoutes,
};
