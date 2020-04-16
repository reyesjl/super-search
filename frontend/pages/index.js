import React from 'react';
import Header from '../components/header';
import jsCookie from 'js-cookie';

class Index extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
    }

    // render index elements.
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="jumbo">
                {!jsCookie.get("screenname") &&
                    <h1>welcome to my home page.</h1>
                }
                {jsCookie.get("screenname") &&
                    <h1>welcome {jsCookie.get("screenname")} </h1>
                }
                </div>
            </div>
        )
    }
}

// export component for use.
export default Index;