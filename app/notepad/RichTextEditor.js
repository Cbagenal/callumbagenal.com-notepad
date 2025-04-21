'use client'
import { Analytics } from "@vercel/analytics/react"
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
    const [colorScheme, setColorScheme] = useState('claude');

    const colorSchemes = {
        claude: {
            background: '#f5f4ed',
            text: '#000000'
        },
        dark: {
            background: '#1A1A1A',
            text: '#E5E5E5'
        },
        light: {
            background: '#FFFFFF',
            text: '#000000'
        }
    };

    useEffect(() => {
        const savedColorScheme = localStorage.getItem('colorScheme');
        if (savedColorScheme) setColorScheme(savedColorScheme);
    }, []);

    useEffect(() => {
        localStorage.setItem('colorScheme', colorScheme);
    }, [colorScheme]);


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
        <div className="h-screen flex flex-col" 
        style={{backgroundColor: colorSchemes[colorScheme].background,
        color: colorSchemes[colorScheme].text
        }}> 
            <div className="flex justify-center flex-grow overflow-hidden">
                <textarea
                ref={editorRef}
                style={{fontSize: fontSize,
                        fontFamily: currentFont, 
                        paddingTop: "60px",
                        backgroundColor: colorSchemes[colorScheme].background,
                        color: colorSchemes[colorScheme].text
                        }}
                className="transition-all duration-500 ease-in-out sm:w-5/6 md:w-2/5 xl-1/4 min-w-[600px] border-none outline-none h-full resize-none hide-scrollbar"
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

                <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="ml-5"
                >
                    <option value="claude">Claude</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>


                <select
                    value={currentFont}
                    onChange={handleFontChange}
                    className="ml-5"
                 >
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


                <Analytics />
            </div>
        </div>
    )
}
