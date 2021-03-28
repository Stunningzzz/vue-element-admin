export default {
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  asideNavStatus: state => state.app.asideNavStatus,
  asideNavIsCollapsing: state => state.app.asideNavIsCollapsing,
  breadCrumbsExcludePath: state => state.app.breadCrumbsExcludePath,
  globalSize: state => state.app.globalSize,
  accessRoutes: state => state.permission.accessRoutes,
  addRoutes: state => state.permission.addRoutes,
};
