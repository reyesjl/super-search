import React from 'react';
import Header from '../components/header';
import jsCookie from 'js-cookie';

class About extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
    }

    // render about elements.
    // black block █
    // black word  █ █ █ █
    // black line  █████████████████████████████
    render() {
        return (
            
            <div class='container'>
                <Header />
                {jsCookie.get("screenname") ?
                    <div class="about">
                        <p>[unclassified version]</p>
                        <br />
                        <br />

                        <h3>Dear {jsCookie.get("screenname")},</h3>
                        <p>welcome to Secret Search! Find unreleased movies, fancy restaurant events, and much more <br/><br/> before anyone else!</p>

                        <br />
                        <br />
                        <p>Enjoy,</p>
                        <p>████ ████</p>
                    </div>
                : 
                    <div class="about">
                        <p>[classified version]</p>
                        <br />
                        <br />

                        <h3>Dear {jsCookie.get("screenname")},</h3>
                        <p>welcome to ████ ███ Find ███ █████ ███, fancy ████ events, and much more <br/><br/> before anyone else!</p>

                        <br />
                        <br />
                        <p>Enjoy,</p>
                        <p>████ ████</p>
                    </div>
            }
                
            </div>
        )
    }
}

// export component for use.
export default About;