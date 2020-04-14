import React from 'react';
import Header from '../components/header';

class About extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
    }

    // render about elements.
    // black block █
    // black word  ████
    // black line  █████████████████████████████
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="about">
                    <p>[classified version]</p>
                    <br />
                    <br />

                    <h3>Welcome to secretSearch,</h3>
                    <p>find unreleased movies, fancy restaurant events, and much more before anyone else!</p>

                    <br />
                    <br />
                    <p>Enjoy,</p>
                    <p>████ ████</p>

                </div>
            </div>
        )
    }
}

// export component for use.
export default About;