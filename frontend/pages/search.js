import React from 'react';
import Header from '../components/header';

class Search extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
    }

    // render search elements.
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="jumbo">
                    <input type="text"></input>
                    <button>search</button>
                </div>
            </div>
        )
    }
}

// export component for use.
export default Search;