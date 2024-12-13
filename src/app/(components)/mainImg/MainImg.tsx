import Image from "next/image"
import img from '../../public/Frame 4.png'


export default function MainImg() {
    return (
        <div className="mainframe">
            <Image src={img} alt="main image" />
        </div>
    )
}

