import React from 'react';
import Navigation from './../components/Navigation';

const Layout = (props) => {
    return (

        <div>
            <Navigation />

            <main>
                {console.log(props.children)}
                {props.children}
            </main>
        </div>

    )
}

export default Layout;