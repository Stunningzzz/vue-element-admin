import './waves.css';

const context = '@@wavesContext';

function handleClick(el, binding) {
  function setRipple(e) {
    // 这里拿到的是空值
    const customOpts = { ...binding.value };
    const opts = {
      ...{
        ele: el, // 波纹作用元素
        type: 'hit', // hit 点击位置扩散 center中心点扩展
        color: 'rgba(0, 0, 0, .1)', // 波纹颜色
      },
      ...customOpts,
    };

    const target = opts.ele;

    if (target === el) {
      target.style.position = 'relative';
      target.style.overflow = 'hidden';
      const rect = target.getBoundingClientRect();
      let ripple = target.querySelector('.waves-ripple');
      if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'waves-ripple';
        ripple.style.height = ripple.style.width =
          Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
      } else {
        ripple.className = 'waves-ripple';
      }
      switch (opts.type) {
        // 如果是center的话 让.waves-ripple的中心和元素的中心重合
        case 'center':
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px';
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px';
          break;
        // 否则让.waves-ripple的中心为点击位置 那么最简单的方法就是拿到点击位置相对于元素左上角的坐标 然后将这个坐标
        // 的x和y都减去1/2的.waves-ripple边长 但是有个问题是 如果e.target 为span的话 那么它的offset是相对于自身而不是
        // 相对于按钮
        default:
          ripple.style.top = e.clientY - rect.top - ripple.offsetHeight / 2 + 'px';
          ripple.style.left = e.clientX - rect.left - ripple.offsetWidth / 2 + 'px';
      }
      ripple.style.backgroundColor = opts.color;
      ripple.className = 'waves-ripple z-active';
    }
  }

  el[context] = {
    ...el[context],
    setRipple,
  };

  return setRipple;
}

export default {
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false);
  },
  update(el, binding) {
    // 重新设置
    el.removeEventListener('click', el[context].setRipple, false);
    el.addEventListener('click', handleClick(el, binding), false);
  },
  unbind(el) {
    el.removeEventListener('click', el[context].setRipple, false);
    delete el[context];
  },
};
