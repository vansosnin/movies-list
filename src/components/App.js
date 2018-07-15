import React, { PureComponent, Fragment } from 'react';
import { Menu } from './Menu';
import '../shared/bootstrap.min.css';

class App extends PureComponent {
    render() {
        return (
            <Fragment>
                <Menu />
            </Fragment>
        );
    }
}

export default App;
