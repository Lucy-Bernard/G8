import type { Metadata } from "next"

import { Quicksand } from "next/font/google"
import NavigationBar from "@/components/NavigationBar/NavigationBar"
import Header from "@/components/Header/Header"

 

const quicksand = Quicksand({ subsets: ["latin"] })

 

export const metadata: Metadata = {

  title: "G8",

  description: "",

}

 

export default function HomeLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (
    <div>
         <Header /> 
         <NavigationBar />
        {children}
</div>
  )

}