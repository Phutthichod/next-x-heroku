import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Home() {
  const route = useRouter()
  // useEffect(() => {

  useEffect(async () => {
    // fetch("/api/hello").then(res => res.json()).then(res => {
    //   console.log(res)
    // })
    const { default: liff } = await import("@line/liff");
    await liff.init({
      liffId: "1655554465-Wld494r2" // Use own liffId
    }).then(() => {
      if (route.query.out) {
        liff.closeWindow()
      } else {
        liff.getProfile().then(profile => {
          localStorage.setItem("profile", JSON.stringify(profile))
          fetch("/api/hello").then(res => res.json()).then(res => {
            console.log(res)
            route.push(res.url)
          })
        })
      }

      // alert(" init success")

    })
      .catch((err) => {
        alert("catch init")
      });
    // alert("useEffect")
    if (liff.isLoggedIn()) {

      // alert(" login")
    } else {
      // alert("not login")
    }


  }, [route])

  // }, [])
  return (
    <></>
  )
}
