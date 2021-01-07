import { useRouter } from 'next/router'
import { useLayoutEffect, useState } from 'react'
function Calendar() {
    const router = useRouter()
    const [eventList, setEventList] = useState([])
    const submit = () => {
        if (router.query.code) {
            fetch("/api/hello", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }, body: JSON.stringify({
                    code: router.query.code
                })
            }).then(res => {
                return res.json()
            }).then(res => {
                console.log(res)
            })
        }
    }
    console.log("render");
    return (
        <>
            <h2>nocnoc@mail.com</h2><button onClick={submit}>accept</button>
        </>
    )
}
export default Calendar