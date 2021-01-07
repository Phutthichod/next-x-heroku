import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Home() {
  const route = useRouter()
  useEffect(() => {
    fetch("/api/hello").then(res => res.json()).then(res => {
      console.log(res)
      route.push(res.url)
    })
  }, [])
  return (
    <></>
  )
}
