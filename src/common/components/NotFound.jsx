import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const [seconds, setSeconds] = useState(10)
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000)

        return () => clearTimeout(timer);
    })

    useEffect(() => {
        if (seconds) return
        navigate("/");
    }, [seconds, navigate])

    return <p className="text-center"><strong>Oops, it seems like your are lost, you will be redirected in {seconds} seconds</strong></p>
}