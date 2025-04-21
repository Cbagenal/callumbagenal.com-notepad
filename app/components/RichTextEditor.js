'use client'
import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import CopyIcon from './copyicon.png';
import BinIcon from './bin.png'

export default function Notepad() {
    const editorRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [text, setText] = useState('')
    const [currentFont, setCurrentFont] = useState('sans-serif');
    const [fontSize, setFontSize] = useState('16px');
    const [binOpen, setBinOpen] = useState(false);
    const [binTimer, setBinTimer] = useState(0);


    useEffect(() => {
        const savedText = localStorage.getItem('note')
        if (savedText) setText(savedText);

        const savedFontSize = localStorage.getItem("savedFontSize", fontSize)
        if (savedFontSize) setFontSize(savedFontSize)
    }, [])

    useEffect(() => {
        localStorage.setItem("note", text)
    }, [text])

    useEffect(() => {
        localStorage.setItem("savedFontSize", fontSize);
    }, [fontSize]);

    useEffect(() => {
        if(binOpen){
            const timer = setTimeout(() => {
                setBinOpen(false);
            }, 1500)
            return () => clearTimeout(timer);
        }
    }, [binOpen])

    const handleCopy = () => {
        const textToCopy = editorRef.current.value;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };


    function Handledelete(){
        setText('');
    }

    function handleFontChange(e) {
        setCurrentFont(e.target.value)
    }

    return(
        <div className="h-screen flex flex-col"> 
            <div className="flex justify-center flex-grow overflow-hidden">
                <textarea
                ref={editorRef}
                style={{fontSize: fontSize, fontFamily: currentFont, paddingTop: "60px"}}
                className="transition-all duration-500 ease-in-out w-2/5 min-w-[400px] border-none outline-none h-full resize-none hide-scrollbar"
                placeholder="Start Typing..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                >
                </textarea>
            </div>
            <div className="flex flex-row ml-8 flex-shrink-0 pt-2 pb-2">
                <input
                    type="range"
                    min={9}
                    max={33}
                    step={2}
                    value={parseInt(fontSize)}
                    onChange={(e) => setFontSize(e.target.value + "px")}
                    className="w-1/20"
                />
                <p className="text-sm ml-3 opacity-50">{fontSize}</p>

                <select value={currentFont} onChange={handleFontChange} className="ml-5">
                    <option value="sans-serif"> Sans serif</option>
                    <option value="Serif"> Serif</option>
                    <option value="monospace"> Monospace</option>
                </select>

                <button onClick={handleCopy} className="ml-3 opacity-60 hover:opacity-100 active:scale-90 transition-all duraction-300 ease-in-out">
                    <Image src={CopyIcon} alt="Copy Icon" width={22}/>
                </button>

                <button 
                onClick={() => {
                    if (binOpen){
                        Handledelete();
                        setBinOpen(false);
                    } else {
                        setBinOpen(true);
                    }
                }}

                    className={`ml-3 opacity-60 hover:opacity-100 active:scale-90 transition-all duration-300 ease-in-out ${binOpen ? 'rotate-45' : ''}`}>
                    <Image src ={BinIcon} alt="'Bin Icon" width={20}/>
                </button>


            </div>
        </div>
    )
}
