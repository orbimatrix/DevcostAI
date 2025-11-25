import React from 'react';

const Testimonials: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">Testimonial</h2>
                    <p className="text-gray-500 mt-2">We streamlined our mainline complex software costs.</p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex animate-marquee space-x-8 w-max">
                        {[
                            {
                                quote: "I really enjoy the software and ever will do a doublecheck on the cost estimations. It's fantastic.",
                                name: "Mark Hanson",
                                role: "Satisfied Client",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark"
                            },
                            {
                                quote: "This gives you the true cost from the source, and labor is excellent. The investment pays off.",
                                name: "Jane Alikie",
                                role: "Manager",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                            },
                            {
                                quote: "I verify trusting status, estimates come in fast. The ability to verify pricing is key.",
                                name: "Tom Faith",
                                role: "Satisfied Client",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
                            },
                            {
                                quote: "I really enjoy the software and ever will do a doublecheck on the cost estimations. It's fantastic.",
                                name: "Mark Hanson",
                                role: "Satisfied Client",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark"
                            },
                            {
                                quote: "This gives you the true cost from the source, and labor is excellent. The investment pays off.",
                                name: "Jane Alikie",
                                role: "Manager",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                            },
                            {
                                quote: "I verify trusting status, estimates come in fast. The ability to verify pricing is key.",
                                name: "Tom Faith",
                                role: "Satisfied Client",
                                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-[400px] flex-shrink-0">
                                <div className="text-indigo-600 text-4xl font-serif mb-4">“</div>
                                <p className="text-gray-600 mb-6 italic">
                                    {testimonial.quote}
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                                        <img src={testimonial.avatar} alt="avatar" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
