'use client'
import { useRef, useEffect, useState } from "react";
import Image from 'next/image';
import CopyIcon from './copyicon.png';

export default function Notepad() {
    const editorRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [text, setText] = useState('')
    const [font, setFont] = useState('')
    const [fontSize, setFontSize] = useState('16px');


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

    const handleCopy = () => {
        const textToCopy = editorRef.current.value;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    return(
        <div className=""> 
            <div className="flex justify-center">
                <textarea
                ref={editorRef}
                style={{fontSize: fontSize, paddingBottom: "1000px", paddingTop: "60px"}}
                className="transition-all duration-500 ease-in-out w-2/5 h-screen border-none outline-none resize-none"
                placeholder="Start Typing..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                >
                </textarea>
            </div>
            <div className="flex flex-row fixed bottom-2 ml-10">
                <input
                    type="range"
                    min={9}
                    max={33}
                    step={2}
                    value={parseInt(fontSize)}
                    onChange={(e) => setFontSize(e.target.value + "px")}
                    className="w-1/3"
                />
                <p className="text-sm ml-3 opacity-50">{fontSize}</p>

                <button onClick={handleCopy} className="ml-5 opacity-60 hover:opacity-100 active:scale-90 transition-all duraction-300 ease-in-out">
                    <Image src={CopyIcon} alt="Copy Icon" width={22}/>
                </button>

            </div>
        </div>
    )
}
