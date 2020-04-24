import Link from 'next/link';
import jsCookie from 'js-cookie';
import Router from 'next/router';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: ""}
    }

    // log user out
    logoutCurrentUser(evt) {
        jsCookie.remove('screenname');
        jsCookie.remove('zipcode');
        Router.replace("/login");
    }

    render() {
        return (
            <div class="header">
                {jsCookie.get("screenname") && 
                    <Link href="/">
                        <a id="unlink">{jsCookie.get("screenname")}</a>
                    </Link>
                }

                {jsCookie.get("screenname") && 
                    <a onClick={this.logoutCurrentUser.bind(this)}>Logout</a>
                }

                {!jsCookie.get("screenname") && 
                    <Link href="/login">
                        <a>Login/Signup</a>
                    </Link>
                }

                <Link href="/search">
                    <a>Search</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/">
                    <a>Home</a>
                </Link>

            </div>
        )
    }
}

export default Header;