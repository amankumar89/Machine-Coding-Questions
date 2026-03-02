import { useState } from "react"
import Layout from "../../components/Layout"
import { InputField } from "./InputField"

interface FormProps {
    name: string;
    email: string;
    message: string;
}

const validate = (form: FormProps) => {
    const newErrors: Record<string, string> = {}

    Object.entries(form).forEach(([key, value]) => {
        if (!value.trim()) {
            newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        }
    })

    return newErrors
}

const ContactForm = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
        message: '',
    })
    const [error, setError] = useState<Record<string, string>>({
        email: '',
        name: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSubmitted(false);
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        const validationErrors = validate(form)
        setError(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitted(true);
        }
    }

    return (
        <Layout title="Contact Form">
            <div className="w-[90vw] lg:max-w-4xl min-h-32 bg-white rounded-md p-8">
                {isSubmitted ? (
                    <>
                        <div className="text-xl font-semibold underline">Thank you, User!</div>
                        <div className="mt-8">
                            <h1 className="underline text-lg font-semibold">Your Details</h1>
                            <div><strong>Name: </strong> {form.name}</div>
                            <div><strong>Email: </strong>{form.email}</div>
                            <div><strong>Message: </strong>{form.message}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <InputField
                            label="Name"
                            name="name"
                            type="name"
                            value={form.name}
                            onChange={handleChange}
                            error={error.name}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            error={error.email}
                        />
                        <InputField
                            label="Message"
                            name="message"
                            type="message"
                            value={form.message}
                            onChange={handleChange}
                            error={error.message}
                        />

                        <button onClick={handleSubmit} type="submit" className="w-full py-2 font-medium rounded-sm bg-blue-600 text-white">
                            Submit
                        </button>
                    </>
                )}
            </div>
        </Layout>
    )
}

export default ContactForm