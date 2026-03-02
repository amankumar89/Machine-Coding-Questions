import { useRef, useState } from "react"
import Layout from "../components/Layout"

const CopyToClipboard = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<string>('');

    const handleCopy = async () => {
        if (inputRef.current) {
            if (!inputRef.current.value?.trim()) {
                setMessage('error, Please enter text to copy.');
                return;
            }
            await navigator.clipboard.writeText(inputRef.current.value);
            inputRef.current.focus();
            setMessage("Text copied.");
        }
    }

    return (
        <Layout title="Copy to Clipboard">
            <div className="w-[90vw] lg:max-w-4xl">
                <h1 className="text-xl mb-4 text-center">
                    Click the button to copy the text
                </h1>
                <div className="border border-black rounded-md bg-gray-100 p-8">

                    <div className="flex flex-wrap items-center gap-6">
                        <label className="text-lg font-serif">
                            Enter your text:
                        </label>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type Something"
                            className="border border-gray-400 px-3 py-2 w-64 outline-none focus:ring-1 focus:ring-gray-500"
                        />
                        <button
                            onClick={handleCopy}
                            className="border border-gray-500 px-6 py-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition"
                        >
                            Copy
                        </button>
                    </div>
                    <p className="ml-2 mt-8" style={{ color: message.includes('error') ? 'red' : 'green' }}>
                        {message}
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default CopyToClipboard
