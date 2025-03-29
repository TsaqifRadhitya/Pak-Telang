import { ReactNode } from "react"

interface props {
    children : ReactNode
}

export default function adminPageLayout({children} : props){
    return(<div className="w-screen min-h-screen bg-[#EBEFFF]">
    </div>)
}
