export default {
  loader: (clientDomain, theme, cb) => {
    if (!theme) return cb();

    // Javascript
    const themeJS = `${clientDomain}/static/js/krypton-client/V4.0/ext/${theme}.js`;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = themeJS;
    document.getElementsByTagName('body')[0].appendChild(script);

    // CSS
    const themeCSS = `${clientDomain}/static/js/krypton-client/V4.0/ext/${theme}-reset.css`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = themeCSS;
    document.getElementsByTagName('body')[0].appendChild(link);

    setTimeout(cb, 0);
  },
};
