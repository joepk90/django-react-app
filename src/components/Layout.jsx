import React from 'react';
import Container from './../components/common/Container';
import Section from './../components/common/Section';

const Layout = (props) => {
    return (

        <div>
            <header className="App-header">
                <Section>
                    <Container>
                        <h1>Django React App - Form Example</h1>
                    </Container>
                </Section>
            </header>

            <main>
                {console.log(props.children)}
                {props.children}
            </main>
        </div>

    )
}

export default Layout;