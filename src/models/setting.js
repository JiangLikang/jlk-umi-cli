import { message } from 'antd';
import defaultSetting from '../default.setting';

let lessNodesAppended;
const updateTheme = primaryColor => {
  if (!primaryColor) {
    return;
  }
  const hideMessage = message.loading('正在编译主题！', 0);
  function buildIt() {
    if (!window.less) {
      return;
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor,
        })
        .then(() => {
          hideMessage();
        })
        .catch(() => {
          message.error('Failed to update theme');
          hideMessage();
        });
    }, 200);
  }
  if (!lessNodesAppended) {
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/color.less');
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

export default {
  name: 'setting',
  state: defaultSetting,
  reducers: {
    getSetting(state) {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      const { primaryColor } = setting;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state, { payload = {} }) {
      const urlParams = new URL(window.location.href);
      Object.keys(defaultSetting).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          urlParams.searchParams.delete(key);
        }
      });
      Object.keys(payload).forEach(key => {
        if(key === 'drawerVisible') {
          return
        }
        let value = payload[key];
        if(value === true) {
          value = 1
        }
        if(defaultSetting[key] !== value) {
          urlParams.searchParams.set(key, value);
        }
      });

      const { primaryColor } = payload;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
    save(state, { payload = {} }) {
      return { ...state, ...payload }
    }
  }
}
