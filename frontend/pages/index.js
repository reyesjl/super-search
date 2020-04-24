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
            <div class="container">
                <Header />
                {jsCookie.get("screenname") ?
                    <div class="container">
                        <div class="jumbo">
                            <h1>Super Search</h1>
                        </div>
                        <div class="home-desc">
                            <h3>{jsCookie.get("screenname")}'s profile</h3>
                            <p><strong>Username: </strong>{jsCookie.get("username")}</p>
                            <p><strong>Password: </strong>{jsCookie.get("password")}</p> 
                            <p><strong>zipcode: </strong>{jsCookie.get("zipcode")}</p> 
                        </div> 
                    </div>
                : 
                    <div class="container">
                        <div class="jumbo">
                            <h1>Super Search</h1>
                            <p>Login to see more information on your account! You'll get classified access to the about page.</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

// export component for use.
export default Index;