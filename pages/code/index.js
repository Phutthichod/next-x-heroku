import { useRouter } from 'next/router'
import { useLayoutEffect, useEffect, useState } from 'react'
function Calendar() {
    const router = useRouter()
    const [eventList, setEventList] = useState([])
    const lineRichMenuChange = () => {
        fetch("https://api.line.me/v2/bot/user/{userId}/richmenu/{richMenuId}", {
            method: "post"
        }).then(res => res.json()).then(res => {
            console.log(res)
        })
    }
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
    useEffect(async () => {
        // fetch("/api/hello").then(res => res.json()).then(res => {
        //   console.log(res)
        // })
        const { default: liff } = await import("@line/liff");
        await liff.init({
            liffId: "1655538913-PnDo5YK0" // Use own liffId
        })

        if (liff.isLoggedIn()) {

            //   loadData()
        }


    }, [])
    return (
        <>
            <h2>nocnoc@mail.com</h2><button onClick={submit}>accept</button>
        </>
    )
}
export default Calendar