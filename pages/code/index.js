import { useRouter } from 'next/router'
import { useLayoutEffect, useState, useEffect } from 'react'
import { async } from 'regenerator-runtime'
import Axios from 'axios';
// import liff from '@line/liff/dist/lib';
function Calendar() {
    const router = useRouter()
    // alert(localStorage.getItem("profile"))
    // const [eventList, setEventList] = useState([])
    // const [profile, setProfile] = useState({})
    // const [onWindowOff, setWindowOff] = useState(function () { })
    const lineRichMenuChange = () => {
        console.log("test")
        let data = JSON.parse(localStorage.getItem("profile"))
        alert(data.userId, data.displayName)
        let url = `https://api.line.me/v2/bot/user/${data.userId}/richmenu/richmenu-c463432b860cd993d02c2f9387b3fadc`
        let token = `btJQcQqukt3/aX8TXIj4UULx5hl7SMJdlLNtby9xJbzqLCJ/CGTMb0NBwqafAHs1HM+NXhk1YdvizPJ8zDwJH0xfO4WRdKCmYit7pfWkKPiiPOA2C6Qxb2GtMjbqzPLD/YnJEB+O0m8/DGOlBbONfwdB04t89/1O/w1cDnyilFU=`
        fetch("/api/calApiLine", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                token,
                url
            })
        }).then(res => res.json()).then(res => {
            alert(res)
            router.push({ pathname: "/", query: { out: "out" } })
            // onWindowOff()

        })

    }
    const submit = () => {
        alert("submit")
        // const data = await liff.getProfile()
        // alert(data.userId)

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
                lineRichMenuChange()

            })
        }
    }
    useEffect(() => {
        // alert("useEffect")
    }, [])
    return (
        <>
            <h2>nocnoc@mail.com</h2><button style={{ width: "100%", height: 300 }} onClick={() => submit()}>accept</button>
        </>
    )
}
export default Calendar