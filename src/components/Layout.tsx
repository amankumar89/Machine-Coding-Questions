import { useNavigate } from "react-router";
import { MoveLeftIcon } from "lucide-react";

type LayoutProps = {
    title: string;
    children: React.ReactNode;
}
const Layout = ({ title, children }: LayoutProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen py-8">
            <div className="flex items-center justify-center mb-8 px-8">
                {window && window.location.pathname !== '/' && (
                    <button type="button" onClick={() => navigate('/')} className="mr-8 border rounded-sm px-2">
                        <MoveLeftIcon />
                    </button>
                )}
                <span className="text-xl md:text-3xl font-bold text-center">
                    {title ?? 'Machine Coding Question'}
                </span>
            </div>
            {children}
        </div>
    );
}

export default Layout