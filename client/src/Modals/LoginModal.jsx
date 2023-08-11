export default function LoginModal ({onClose}) {

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <p>Username or Password is Incorrect</p>
                <button onClick={onClose}>Try Again</button>
            </div>
        </div>
    )
}
