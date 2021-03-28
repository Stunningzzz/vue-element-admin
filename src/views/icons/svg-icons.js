const req = require.context('@/icons/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys();

const regExp = /\.\/(.*)\.svg/;
const svgIcons = requireAll(req).map(i => {
  return regExp.exec(i)[1];
});

export default svgIcons;
