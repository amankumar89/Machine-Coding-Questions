import { Search } from "lucide-react"
import Layout from "../components/Layout"
import { useRef, useState } from "react"
import { colorNameToHex } from "../helper";

const ColorExplorer = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [colorData, setColorData] = useState({
        name: '',
        hex: '',
        error: false,
    });

    function handleClick() {
        const colorName = inputRef.current!.value!;
        const hex = colorNameToHex(colorName);
        const error = hex === undefined;
        setColorData((prev) => ({
            ...prev,
            name: colorName,
            hex,
            error,
        }))
    }

    return (
        <Layout title="Color Explorer">
            {/* container */}
            <div className="md:w-2xl mx-auto my-0">
                {/* top container */}
                <div className="flex items-center w-full mx-auto bg-white border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                    />

                    <button
                        onClick={handleClick}
                        className="px-4 py-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                </div>
                {/* bottom container */}
                {colorData.hex && !colorData.error && (
                    <div className="grid place-items-center bg-white rounded-md my-4 py-8">
                        <div className="w-36 h-36 rounded-full" style={{
                            background: colorData?.hex
                        }} />
                        <div className="my-4">
                            <strong>Name:</strong><span>{` ${colorData.name}`}</span>
                        </div>
                        <div>
                            <strong>Hex:</strong><span>{` ${colorData.hex}`}</span>
                        </div>
                    </div>
                )}

                {colorData.error && (
                    <div className="grid place-items-center my-4 py-8">

                        <p className="text-red-500">
                            Sorry, I couldn't recognise that color.
                        </p>
                    </div>
                )}

            </div>
        </Layout>
    )
}

export default ColorExplorer