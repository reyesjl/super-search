import Link from 'next/link';
import jsCookie from 'js-cookie';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: ""}
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
                    <Link href="/">
                        <a>Logout</a>
                    </Link>
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