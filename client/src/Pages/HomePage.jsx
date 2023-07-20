export function HomePage() {
    return (
        <div>
            <header>
                Login
            </header>
            <form>
                <label>Username:</label>
                <input type="text" id="username"></input><br />
                <label>Password:</label>
                <input type="password" id="password"></input><br />
                <button type="submit">Login</button>
                <button type="button" onClick={() => {
                    window.location.href = '/registration';
                }} >Register a new User
                </button>
            </form>
        </div>
    )
}
