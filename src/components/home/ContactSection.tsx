"use client";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="relative inline-block mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase">CONTACT US</h2>
                    <span className="absolute -bottom-4 left-0 w-[100px] h-1 bg-primary block" />
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-8">
                    {[
                        { label: "FULL NAME", type: "text", placeholder: "NAME" },
                        { label: "EMAIL ADDRESS", type: "email", placeholder: "EMAIL" },
                        { label: "COUNTRY", type: "text", placeholder: "COUNTRY" },
                        { label: "SUBJECT", type: "text", placeholder: "SUBJECT" },
                    ].map(({ label, type, placeholder }) => (
                        <div key={label} className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">{label}</label>
                            <input
                                type={type}
                                placeholder={placeholder}
                                className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium"
                            />
                        </div>
                    ))}

                    <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-muted font-bold">MESSAGE</label>
                        <textarea
                            rows={4}
                            placeholder="MESSAGE"
                            className="bg-transparent border-b border-border py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium resize-none"
                        />
                    </div>

                    <div className="md:col-span-2 mt-8">
                        <button
                            type="submit"
                            className="w-full bg-primary text-black font-bold uppercase tracking-[0.4em] py-5 text-sm hover:bg-yellow-500 transition-colors"
                        >
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
