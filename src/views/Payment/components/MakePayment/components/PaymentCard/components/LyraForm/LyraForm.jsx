import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import kr from './service/kr';

class LyraForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      dynamicKrPostUrlRefused: null,
      dynamicKrPostUrlSuccess: null,
    };
  }

  componentDidMount() {
    const { 'kr-form-token': krFormToken } = this.props;

    // Inheritate from global
    const globalConfiguration = kr.getGlobalConfiguration();
    Object.keys(globalConfiguration).forEach((key) => {
      const camelCaseKey = kr.normalize('kebabCase', 'camelCase', key);
      const dataKey = `dynamic${camelCaseKey}`;
      if (!this.state[dataKey]) {
        this.setState({
          [dataKey]: globalConfiguration[key],
        });
      }
    });

    if (krFormToken != null) this.setupForm();    
  }

  componentDidUpdate(prevProps) {    
    if (prevProps['kr-form-token'] !== this.props['kr-form-token']) this.setupForm();
  }

  setupForm = () => {
    if (window.hasOwnProperty('KR')) {
      window.KR.onFormReady(() => {
        this.setConfig();
      });

    } else {
      // Wait until the library is loaded
      const checkInterval = setInterval(() => {
        if (window.hasOwnProperty('KR')) {
          this.setupForm();
          clearInterval(checkInterval);
        } 
      }, 50);
    }
  };

  setConfig = () => {
    const {
      'kr-form-token': formToken,
      'kr-language': language,
    } = this.props;

    const formConfig = {
      formToken,
    };

    const krPublicKey = window['kr-public-key'];

    if (krPublicKey) formConfig.publicKey = krPublicKey;
    if (language) formConfig.language = language;

    // Wait until everything is loaded
    const loadCheckInterval = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(loadCheckInterval);
        kr.setFormConfig(formConfig);
      }
    }, 25);
  };
  
  render() {
    const { isVisible: isVisibleProps } = this.props;
    const { isVisible: isVisibleState } = this.state;
    const isVisible = isVisibleProps !== undefined && typeof isVisibleProps === 'boolean'
      ? isVisibleProps : isVisibleState;
    const {
      'kr-form-token': formToken,
      'kr-language': language,
      'kr-placeholder-pan': placeholderPan,
      'kr-placeholder-expiry': placeholderExpiry,
      'kr-placeholder-security-code': placeholderSecurityCode,
      'kr-hide-debug-toolbar': hideToolbar,
      'kr-clear-on-error': clearOnError,
      'kr-post-url-success': postSuccess,
      'kr-post-url-refused': postRefused,
    } = this.props;

    return (
      <div className="kr-embedded-wrapper-isVisible" style={{ opacity: isVisible ? 1 : 0 }}>
        <div
          className="kr-embedded"
          kr-form-token={formToken}
          kr-language={language}
          kr-placeholder-pan={placeholderPan}
          kr-placeholder-expiry={placeholderExpiry}
          kr-placeholder-security-code={placeholderSecurityCode}
          kr-hide-debug-toolbar={hideToolbar}
          kr-clear-on-error={clearOnError}
          kr-post-url-success={postSuccess}
          kr-post-url-refused={postRefused}
        >
          <div className="kr-pan" />
          <div className="kr-expiry" />
          <div className="kr-security-code" />
          <button className="kr-payment-button" />
          <div className="kr-form-error" />
        </div>
      </div>
    );
  }
}

LyraForm.propTypes = {
  'kr-form-token': PropTypes.string,
  'kr-language': PropTypes.string,
  'kr-placeholder-pan': PropTypes.string,
  'kr-placeholder-expiry': PropTypes.string,
  'kr-placeholder-security-code': PropTypes.string,
  'kr-hide-debug-toolbar': PropTypes.string,
  'kr-clear-on-error': PropTypes.string,
  'kr-post-url-success': PropTypes.string,
  'kr-post-url-refused': PropTypes.string,
  isVisible: PropTypes.bool,
};

export default LyraForm;
