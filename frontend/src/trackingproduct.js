import { useState } from "react"
import Topnav, { Bottomnav } from "./component"

const Track = () => {

    const[st2,setst2]=useState("step-wizard-item current-item");
    const[st3,setst3]=useState("step-wizard-item");
    const[st4,setst4]=useState("step-wizard-item");
    return (
        <>
            <Topnav />
            <Bottomnav />

            <section className="step-wizard">
                <ul className="step-wizard-list">
                    <li className="step-wizard-item">
                        <span className="progress-count">1</span>
                        <span className="progress-label">Ordered</span>
                    </li>
                    <li className={st2}>
                        <span className="progress-count">2</span>
                        <span className="progress-label">Picked</span>
                    </li>
                    <li className={st3}>
                        <span className="progress-count">3</span>
                        <span className="progress-label">Shipped</span>
                    </li>
                    <li className={st4}>
                        <span className="progress-count">4</span>
                        <span className="progress-label">Delevered</span>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default Track