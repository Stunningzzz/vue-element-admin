export default {
  token: state => state.user.token,
  roles: state => state.user.roles,
  asideNavStatus: state => state.app.asideNavStatus,
  asideNavIsCollapsing: state => state.app.asideNavIsCollapsing,
  breadCrumbs: state => state.app.breadCrumbs,
  breadCrumbsExcludePath:state => state.app.breadCrumbsExcludePath,
  accessRoutes: state => state.permission.accessRoutes,
  addRoutes: state => state.permission.addRoutes,
  
};
