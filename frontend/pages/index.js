import React from 'react';
import Header from '../components/header';

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
                    <h1>welcome to my home page.</h1>
                </div>
            </div>
        )
    }
}

// export component for use.
export default Index;