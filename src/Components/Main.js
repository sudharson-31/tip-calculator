import { useState, useEffect,useRef} from "react"


export default function Main(){
    const [inpAmount, setInpAmount] = useState();
    const [inpPerson, setInpPerson] = useState();
    const [tipAmount, setTipAmount] = useState(0.00);
    const [totalAmount, setTotalAmount] = useState(0.00);
    const [tipPercent, setTipPercent] =useState(15);
    const [disabledReset, setDisabledReset] = useState(true)
    const inpPersonRef = useRef();
        useEffect(()=>{
            if(document.getElementById("tip-percent").value){
               setTipPercent(document.getElementById("tip-percent").value)
            }
        
        if(inpPerson && inpAmount){
            let totalTip = parseFloat(tipPercent/100)*inpAmount ;
            setTipAmount(totalTip/inpPerson)


            setDisabledReset(false)
        }
        else{
            
            setDisabledReset(true)
        }

        
    },[inpAmount,inpPerson,tipPercent])
    useEffect(()=>{
        if(inpPerson==0){
            inpPersonRef.current.className = "error"
            document.getElementById("e-msg").style.display = "block";
        }
        else{
            inpPersonRef.current.className = ""
            document.getElementById("e-msg").style.display = "none";
        }
    },[inpPerson])
    useEffect(()=>{
        if(inpPerson && inpAmount){
            let totalAmt = parseFloat(inpAmount/inpPerson) + tipAmount;
            setTotalAmount(totalAmt);
        }

    },[tipAmount]);
    function reset(){
        setInpAmount("")
        setInpPerson("")
        setTipAmount(0)
        setTotalAmount(0)
        setTipPercent(15)
        document.getElementById("tip-percent").value = null;
    }
    return(
        <div id="Main">
            <div className="main-left">
                <div className="userinput">
                    <label htmlFor="billAmount">Bill</label>
                    <span>
                        <input id="amount" type="number" name="billAmount" min={0} placeholder="0" value={inpAmount} onChange={e=>setInpAmount(e.target.value)}></input>
                    </span>
                </div>
                <div className="userinput">
                    <label htmlFor="tip-percent">Select Tip %</label>
                    <span className="quick-percent">
                        <button className="percent" onClick={()=>setTipPercent(5)}>5%</button>
                        <button className="percent" onClick={()=>setTipPercent(10)}>10%</button>
                        <button className="percent" onClick={()=>setTipPercent(15)}>15%</button>
                        <button className="percent" onClick={()=>setTipPercent(25)}>25%</button>
                        <button className="percent" onClick={()=>setTipPercent(50)}>50%</button>
                        <input id="tip-percent" className="percent" type="number" placeholder="Custom" max={100} onChange={e=>{setTipPercent(e.target.value)}}></input>
                    </span>
                </div>
                <div className="userinput">
                    <span className="labels">
                        <label htmlFor="noOfPeople">Number of People</label>
                        <label htmlFor="noOfPeople" id="e-msg">Can't be zero</label>
                    </span>

                    <span >
                        <input id="peoplecount" ref={inpPersonRef} className="" type="number" min={0} name="noOfPeople" placeholder="0" value={inpPerson} onChange={e=>setInpPerson(e.target.value)}></input>
                    </span>
                </div>
            </div>
            <div className="main-right">
                <div id="result">
                <div className="calculated">
                    <div className="c-left">
                        <span className="c-title">
                            Tip Amount
                        </span>
                        <div className="c-split">
                            / person
                        </div>
                    </div>
                    <div className="c-right">
                            <span className="currency">$</span>
                            <span className="c-amount">{tipAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div className="calculated">
                    <div className="c-left">
                        <span className="c-title">
                            Total Amount
                        </span>
                        <div className="c-split">
                            / person
                        </div>
                    </div>
                    <div className="c-right">
                        <span className="currency">$</span>
                        <span className="c-amount">{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                </div>
                <div className="reset-holder">
                    <button id="reset"  disabled={disabledReset} onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    )
}