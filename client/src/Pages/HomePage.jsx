// import { useState, useEffect } from "react";
import LoginPageList from "../Lists/LoginPageList"

export function HomePage() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);
    
    return (
        <div>
            <header>
                Login
            </header>
            <HomePageList />
        </div>
    )
}
