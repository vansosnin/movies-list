import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import '../shared/bootstrap.min.css';

class App extends PureComponent {
    render() {
        const { store } = this.props;
        return (
            <Fragment>
                <Menu store={store} />
            </Fragment>
        );
    }
}

App.propTypes = {
    store: PropTypes.object,
};

export default App;
