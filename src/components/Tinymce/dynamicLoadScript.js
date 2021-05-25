const dynamicLoadScript = (src, callback) => {
  // 为什么是通过id拿? 因为自定义创建的时候会把id设置为src
  const existingScript = document.getElementById(src);
  const cb = callback || function() {};
  // 已经存在该标签 但外面还是调用了load方法 说明没有成功加载
  if (existingScript) {
    existingScript.parentNode.removeChild(existingScript);
  }
  const script = document.createElement('script');
  script.src = src;
  script.id = src;
  document.body.appendChild(script);

  // 加载script完成的回调
  const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
  onEnd(script);

  // 在非ie中 通过监听onload方法就可以知道通过script标签引入的cdn是否加载完成
  function stdOnEnd(script) {
    script.onload = function() {
      // this.onload = null here is necessary
      // because even IE9 works not like others
      this.onerror = this.onload = null;
      cb(null, script);
    };
    script.onerror = function() {
      this.onerror = this.onload = null;
      cb(new Error('Failed to load ' + src), script);
    };
  }

  function ieOnEnd(script) {
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded')
        return;
      this.onreadystatechange = null;
      cb(null, script); // there is no way to catch loading errors in IE8
    };
  }
};

export default dynamicLoadScript;
