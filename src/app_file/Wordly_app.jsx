import React, { useState, useEffect, useRef } from "react";

function App() {

    const [enteredInput, setInput] = useState("")
    const [expectedAnswer, setExpectedAnswer] = useState("")
    const [colorCodingData, setColorCodingData] = useState([])
    let number = useRef(0)

    //create array to use map
    const objArray = Array.from({"length":4},(_,i)=>i)

    //access answer expected
    useEffect(() => {
        const data = require("./answer.json")
        const index = Math.floor(Math.random() * 10)
        setExpectedAnswer(data.product[index])
    }, [])
    //print expected answer
    console.log(expectedAnswer)

    //handle the submit of answer
    const inputHandler = () => {
        number.current += 1
        let str = ""
        for (let i = 0; i < 5; i++) {
            if (expectedAnswer.toUpperCase().includes(enteredInput[i].toUpperCase())) {
                if (expectedAnswer[i].toUpperCase() === enteredInput[i].toUpperCase()) {
                    str += "1"
                } else {
                    str += "2"
                }
            } else {
                str += "3"
            }
        }
        setColorCodingData([...colorCodingData, { "letter": enteredInput.toUpperCase(), "color": str }])
        setInput("")
        //console.log(number.current)
    }

    //create UI blocks to display each letter
    function comp(i) {
        let str = []
        for (let j = 0; j < 5; j++) {
            str.push(
                <input type="text"
                    value={colorCodingData[i] ? colorCodingData[i]["letter"][j] : ""}
                    className={`flex text-center border-2 border-bold rounded-lg w-12 h-12 text-3xl ${(colorCodingData[i] && colorCodingData[i]["color"][j] === "1") ? 'bg-green-600 text-white' : (colorCodingData[i] && colorCodingData[i]["color"][j] === "2") ? "bg-yellow-600 text-white" : "bg-red-600 text-white"}`} />)
        }
        return <div>{str}</div>

    }

    return (<>
        <div className="flex flex-col w-screen h-screen items-center ml-4 mt-4">
            <div>
                <div>
                    {/*<div className="row1">
                <input type="text" value={colorCodingData[0]?colorCodingData[0]["letter"][0]:""} className={`border-2 border-bold rounded-lg w-12 h-12 ${(colorCodingData[0]&&colorCodingData[0]["color"][0]==="1")?'text-green-600':`${(colorCodingData[0]&&colorCodingData[0]["color"][0]==="2")?"text-yellow-600":"text-red-600"}`}`} />
                <input type="text" value={colorCodingData[0]?colorCodingData[0]["letter"][1]:""} className={`border-2 border-bold rounded-lg w-12 h-12 ${(colorCodingData[0]&&colorCodingData[0]["color"][1]==="1")?'text-green-600':`${(colorCodingData[0]["color"][1]==="2")?"text-yellow-600":"text-red-600"}`}`} />
                <input type="text" value={colorCodingData[0]?colorCodingData[0]["letter"][2]:""} className={`border-2 border-bold rounded-lg w-12 h-12 ${(colorCodingData[0]&&colorCodingData[0]["color"][2]==="1")?'text-green-600':`${(colorCodingData[0]["color"][2]==="2")?"text-yellow-600":"text-red-600"}`}`} />
                <input type="text" value={colorCodingData[0]?colorCodingData[0]["letter"][3]:""} className={`border-2 border-bold rounded-lg w-12 h-12 ${(colorCodingData[0]&&colorCodingData[0]["color"][3]==="1")?'text-green-600':`${(colorCodingData[0]["color"][3]==="2")?"text-yellow-600":"text-red-600"}`}`} />
            </div>*/}

                    {
                        objArray.map((i) => {
                            let str = []
                            for (let j = 0; j < 5; j++) {
                                str.push(
                                    <input type="text"
                                        value={colorCodingData[i] ? colorCodingData[i]["letter"][j] : ""}
                                        className={`flex text-center border-2 border-bold rounded-lg w-12 h-12 text-3xl ${(colorCodingData[i] && colorCodingData[i]["color"][j] === "1") ? 'bg-green-600 text-white' : (colorCodingData[i] && colorCodingData[i]["color"][j] === "2") ? "bg-yellow-600 text-white" : "bg-red-600 text-white"}`} />)
                            }
                            return <div className="flex flex-row">{str}</div>
                        })
                    }

                </div>

            </div>
            <div className="input_data">
                <input type="text" value={enteredInput} onChange={(e) => { setInput(e.target.value) }} className="border-2 border-bold rounded-lg h-12 w-42 mr-1" minLength={5} maxLength={5} disabled={number.curret >= 4} />
                <input type="submit" onClick={inputHandler} className="border-2 rounded w-14 py-2" disabled={number.current >= 4 || enteredInput.length < 1} />
            </div>

        </div>
    </>)
}

export default App