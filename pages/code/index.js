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
        let data = JSON.parse(localStorage.getItem("profile"))
        alert(data.userId, data.displayName)
        let url = `https://api.line.me/v2/bot/user/Ud8c0916bc67de1c985a22a8f77120efc/richmenu/richmenu-e419d3ad588ff46ccf001de031fdf94e`
        let token = `7vFL8nhVmzvjohBD38AGXAYZfhe+6BMF3syevcddi4rUu8QlHEsrDK4dCIgv+WQsPhJXFZx1HIv6HHoeqhoRliOEmhx+hQ3nYV7TRYcoz76XVbqqMBOKsGILcG41KJUYEB+tVG5ar9tIBaZMtFNZ5gdB04t89/1O/w1cDnyilFU=`
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {

        };
        Axios.post(
            url,
            bodyParameters,
            config
        ).then(res => {
            alert("send success")
            // onWindowOff()
        }).catch(function (error) {
            alert(error.status);
        });

    }
    const submit = () => {
        // alert("submit")
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
                // alert("summit")
                lineRichMenuChange()
                // await lineRichMenuChange()

            })
        }
    }
    useEffect(async () => {
        await liff.init({
            liffId: "1655554465-Wld494r2" // Use own liffId
        }).then(() => {
            // setWindowOff(() => liff.openWindow())
        })
    })
    return (
        <>
            <h2>nocnoc@mail.com</h2><button onClick={() => submit()}>accept</button>
        </>
    )
}
export default Calendar