import React from 'react';
import Header from '../components/header';
import jsCookie from 'js-cookie';
import Router from 'next/router';

class Search extends React.Component {

    // construct component.
    constructor(props) {
        super(props);
        this.state = {search: "", results: []};
    }

    // handleSearch textbox
    handleSearch(evt) {
        this.setState({search: evt.target.value});
        this.sendSearch(evt.target.value);
    }   

    // send search
    async sendSearch(searchterm) {
        // send with zipcode
        if (jsCookie.get("zipcode")) {
            // store cookie and send search
            const zipcode = jsCookie.get("zipcode"); 
            const searchQuery = await fetch(`http://localhost:8080/search?s=${searchterm}&z=${zipcode}`);

            // response from server
            const searchResults = await searchQuery.json();
            this.setState({results: searchResults});
        // send without zipcode
        } else {
            // send search to backend
            const searchQuery = await fetch(`http://localhost:8080/search?s=${searchterm}&z=0`);

            // response from server
            const searchResults = await searchQuery.json();
            this.setState({results: searchResults});
        }
    }

    // render search elements.
    render() {
        return (
            <div class='container'>
                <Header />
                <div class="jumbo">
                    <input type="text" placeholder="coffee shops, etc." onChange={this.handleSearch.bind(this)}></input>
                </div>

                <div class="table-wrapper">
                    <table class="myTable">
                    {"results" in this.state && this.state.results.status == "movies" && this.state.search != "" && this.state.results != "" ? 
                        <tr>
                            <th>Name</th>
                            <th>Theater</th>
                            <th>Location</th>
                            <th>City</th>
                            <th>Zipcode</th>
                        </tr>  : null
                    }
                    {"results" in this.state && this.state.results.status == "movies" && this.state.search != "" && this.state.results != "" ? 
                        this.state.results.movies.map((movies) => (
                        <tr>
                            <td>{movies.name}</td>
                            <td>{movies.theater}</td>
                            <td>{movies.address}</td>
                            <td>{movies.city}</td>
                            <td>{movies.zip}</td>
                        </tr>  
                        )) : null
                    }


                    {"results" in this.state && this.state.results.status == "restaurants" && this.state.search != "" && this.state.results != "" ? 
                        <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>City</th>
                        <th>Zipcode</th>
                        </tr>  : null
                    }
                    {"results" in this.state && this.state.results.status == "restaurants" && this.state.search != "" && this.state.results != "" ? 
                        this.state.results.restaurants.map((restaurants) => (
                        <tr>
                            <td>{restaurants.name}</td>
                            <td>{restaurants.type}</td>
                            <td>{restaurants.address}</td>
                            <td>{restaurants.city}</td>
                            <td>{restaurants.zip}</td>
                        </tr>  
                        )) : null
                    }
                    
                    
                    
                    </table>
                </div>
            </div>
        )
    }
}

// export component for use.
export default Search;