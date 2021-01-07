import { useRouter } from 'next/router'
import { useLayoutEffect, useState, useEffect } from 'react'
import { async } from 'regenerator-runtime'
function Calendar() {
    const router = useRouter()
    const [eventList, setEventList] = useState([])
    const [profile, setProfile] = useState({})
    const lineRichMenuChange = (data) => {
        alert(data.userId)
        fetch(`https://api.line.me/v2/bot/user/${data.userId}/richmenu/richmenu-e419d3ad588ff46ccf001de031fdf94e`, {
            method: "post",
            headers: new Headers({
                'Authorization': 'Bearer  ' + "7vFL8nhVmzvjohBD38AGXAYZfhe+6BMF3syevcddi4rUu8QlHEsrDK4dCIgv+WQsPhJXFZx1HIv6HHoeqhoRliOEmhx+hQ3nYV7TRYcoz76XVbqqMBOKsGILcG41KJUYEB+tVG5ar9tIBaZMtFNZ5gdB04t89/1O/w1cDnyilFU=",
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }),
        }).then(res => res.json()).then(res => {
            alert("success")
            liff.closeWindow()
        }).catch(err => {
            alert("catch ")
        })
    }
    const submit = async () => {
        alert("submit")
        const data = await liff.getProfile()
        alert(data.userId)

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
                lineRichMenuChange(data)
                // await lineRichMenuChange()

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
        }).then(() => {
            liff.getProfile().then(profile => {
                alert(profile.userId)
            })
            alert(" init success")
        })
            .catch((err) => {
                alert("catch init")
            });
        alert("useEffect")
        if (liff.isLoggedIn()) {

            alert(" login")
        } else {
            alert("not login")
        }


    }, [])
    return (
        <>
            <h2>nocnoc@mail.com</h2><button onClick={async () => await submit()}>accept</button>
        </>
    )
}
export default Calendar