import { NavLink, type RouteObject } from "react-router"
import { getTitle } from "../helper"

const FeatureCard = ({ count, path }: { count: number } & RouteObject) => {
    return (
        <NavLink
            key={path}
            to={path!}
            className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200"
        >
            <div className="absolute right-2 top-1/2 -translate-y-1/2 
                bg-blue-400 w-12 h-12 rounded-full 
                grid place-items-center">
                <span className="font-semibold text-white text-2xl">{count}</span>
            </div>

            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {getTitle(path!)}
            </h2>
            {/* <p className="text-gray-600 text-sm">
                {description}
            </p> */}
        </NavLink>
    )
}

export default FeatureCard