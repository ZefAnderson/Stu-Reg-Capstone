export default function LoginModal ({onClose}) {

    return (
        <div className="modalBackground">
            <div className="modalContent">
                <p>"Uh-Oh, you didn't say the magic word!"</p>
                <button onClick={onClose}>Done</button>
            </div>
        </div>
    )
}