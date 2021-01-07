import { useRouter } from 'next/router'
import { useLayoutEffect, useEffect, useState } from 'react'
import { async } from 'regenerator-runtime'
function Calendar() {
    const router = useRouter()
    const [eventList, setEventList] = useState([])
    const lineRichMenuChange = async () => {
        const data = await liff.getProfile()

        alert(data.userId)
        fetch(`https://api.line.me/v2/bot/user/${data.userId}/richmenu/richmenu-e419d3ad588ff46ccf001de031fdf94e`, {
            method: "post",
            headers: new Headers({
                'Authorization': 'Bearer  ' + "7vFL8nhVmzvjohBD38AGXAYZfhe+6BMF3syevcddi4rUu8QlHEsrDK4dCIgv+WQsPhJXFZx1HIv6HHoeqhoRliOEmhx+hQ3nYV7TRYcoz76XVbqqMBOKsGILcG41KJUYEB+tVG5ar9tIBaZMtFNZ5gdB04t89/1O/w1cDnyilFU=",
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(res => res.json()).then(res => {
            liff.closeWindow()
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
                alert("summit")
                lineRichMenuChange()

            })
        }
    }
    useEffect(async () => {
        // fetch("/api/hello").then(res => res.json()).then(res => {
        //   console.log(res)
        // })
        const { default: liff } = await import("@line/liff");
        await liff.init({
            liffId: "1655554465-Wld494r2" // Use own liffId
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