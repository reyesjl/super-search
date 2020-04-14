import Link from 'next/link';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: ''}
    }
    
    render() {
        return (
            <div class="header">
                {this.state.user && 
                    <Link href="/">
                        <a id="unlink">{this.state.user}</a>
                    </Link>
                }

                {this.state.user && 
                    <Link href="/">
                        <a>Logout</a>
                    </Link>
                }

                {!this.state.user && 
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