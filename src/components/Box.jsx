import { useState } from "react"

const Box = ({ children }) => {
    const [toggle, setToggle] = useState(true)

    const handleToggle = () => {
        setToggle(toggle => !toggle)
    }

    return (
        <div className="box">
            <button onClick={handleToggle} className="btn-toggle">{toggle ? '+' : '-'}</button>
            {toggle && children}
        </div>
    )
}

export default Box;