import Layout from "../../components/Layout"
import Dashboard from "./Dashboard"
import Navbar from "./Navbar"
import { UserProvider } from "./UserContext"

const Authentication = () => {
    return (
        <UserProvider>
            <Layout title="Authentication">
                {/* container */}
                <div className="md:w-3xl mx-auto my-0 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
                    <Navbar />
                    <Dashboard />
                </div>
            </Layout>
        </UserProvider>
    )
}

export default Authentication