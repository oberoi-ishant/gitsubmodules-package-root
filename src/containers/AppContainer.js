import React from 'react';
import Loader from 'react-component-lazy-load';


const DefaultComp = () => <div className="loader"></div>;
const ErrorComp = ({ loadError }) => <div>Error: { loadError.message }</div>;

// const SecondComponent = Loader({
//   loader: () => import('./SecondComponent'),
//   DefaultComp,
//   ErrorComp
// });

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.appOrComponentRef = null;
  }

  getElement({ elemName }) {
    let packOne = document.getElementById(elemName);
    if (!packOne) {
      packOne = document.createElement('div');
      packOne.id = elemName;
      const rootApp = document.getElementById('app');
      rootApp.appendChild(packOne);
    }
    return packOne;
  }

  loadAppOrComponent({ componentName, appName, props }) {
    console.log('Hello');
    // __non_webpack_require__(["lodash-pack-one"], (myApp) => {
    //   console.log('MyApp', myApp);
    // });

    // webpack owns it.
    // require.ensure(['lodash-pack-one'], (require) => {
    //   this.appOrComponentRef = require('lodash-pack-one');
    //   console.log(this.appOrComponentRef);
    //   const element = componentName
    //     ? this.getElement({ elemName: componentName })
    //     : this.getElement({ elemName: appName });
    //   this.appOrComponentRef.mountFn({
    //     element,
    //     componentName,
    //     appName,
    //     props
    //   });
    // });

    // AMD version.
    // require(['lodash-pack-one'], (myApp) => {
    //   this.appOrComponentRef = myApp;
    //   console.log(this.appOrComponentRef);
    //   const element = componentName
    //     ? this.getElement({ elemName: componentName })
    //     : this.getElement({ elemName: appName });
    //   this.appOrComponentRef.mountFn({
    //     element,
    //     componentName,
    //     appName,
    //     props
    //   });
    // });

    // commonJS require.
    // var myApp = require('lodash-pack-one');
    // this.appOrComponentRef = myApp;
    // console.log(this.appOrComponentRef);
    // const element = componentName
    //   ? this.getElement({ elemName: componentName })
    //   : this.getElement({ elemName: appName });
    // this.appOrComponentRef.mountFn({
    //   element,
    //   componentName,
    //   appName,
    //   props
    // });

    import('gitsubmodules-package-child/index.js')
      .then(module => {
        this.appOrComponentRef = module;
        const element = componentName
          ? this.getElement({ elemName: componentName })
          : this.getElement({ elemName: appName });
        this.appOrComponentRef.mountFn({
          element,
          componentName,
          appName,
          props
        });
    });
  }

  loadAppOrComponent1({ componentName, appName, props }) {
    // import('lodash-pack-one')
    //   .then(module => {
    //     this.appOrComponentRef = module;
    //     const element = componentName
    //       ? this.getElement({ elemName: componentName })
    //       : this.getElement({ elemName: appName });
    //     this.appOrComponentRef.mountFn({
    //       element,
    //       componentName,
    //       appName,
    //       props
    //     });
    // });
  }

  unloadAppOrComponent(name) {
    const elem = this.getElement({elemName: name});
    if (this.appOrComponentRef) {
      this.appOrComponentRef.unMountFn(elem);
    }
  }

  render () {
    return (
      <div>
        <div>Welcome to react</div>
        <button onClick={ () => this.loadAppOrComponent({ appName:    'lodash-pack-one' }) }>App</button>
        <button onClick={ () => this.unloadAppOrComponent('lodash-pack-one') }>UnMount App</button>

        <button onClick={ () => this.loadAppOrComponent({ componentName: 'MyPage', props: { name: 'MyPageComponent' } }) }>Component MyPage</button>
        <button onClick={ () => this.unloadAppOrComponent('MyPage') }>UnMount Component</button>

        <button onClick={ () => this.loadAppOrComponent1({ componentName: 'TestComponent', props: { name: 'TestComp' } }) }>Component TestComp</button>
        <div>
          hello world
        </div>
      </div>
    );
  }
}
