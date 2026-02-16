"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Globe, Send } from "lucide-react";
import DefaultWeight from "@/components/shared/defaultWeight/DefaultWeight";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <DefaultWeight>
      <section className="py-24 relative overflow-hidden bg-[#f8f9fa] perspective-[2000px]">
        {/* Advanced Magical Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>

          {/* Drifting Geometric Shapes */}
          <div className="absolute top-[10%] left-[5%] w-12 h-12 border-2 border-primary/10 rounded-xl rotate-12 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute bottom-[20%] right-[10%] w-24 h-24 border border-blue-600/10 rounded-full animate-[bounce_8s_ease-in-out_infinite]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Container: Form + Map */}
          <div className="flex flex-col md:flex-row bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_80px_150px_-30px_rgba(0,0,0,0.1)] min-h-[650px] mb-16 transition-all duration-1000 hover:shadow-[0_100px_200px_-40px_rgba(0,0,0,0.15)] overflow-hidden group/main [transform-style:preserve-3d] hover:rotate-x-1 hover:rotate-y-1">
            {/* Left: Contact Form */}
            <div className="w-full md:w-1/2 bg-white/40 backdrop-blur-sm p-10 md:p-14 lg:p-16 relative">
              <h1 className="text-[32px] md:text-[42px] font-black text-text-primary mb-12 tracking-tighter leading-[0.9] uppercase">
                Contact
                <span className="text-primary">Us</span>
              </h1>

              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <label className="block text-[11px] font-[800] text-text-muted uppercase tracking-[0.15em]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-[#f8f9fa] p-2 rounded-2xl px-8 py-7 text-[15px] focus:outline-none focus:bg-white focus:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.1)] transition-all duration-500 placeholder:text-text-muted/40 text-text-secondary shadow-sm"
                      required
                    />
                  </div>
                  <div className="space-y-8">
                    <label className="block text-[11px] font-[800] text-text-muted uppercase tracking-[0.15em]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#f8f9fa] p-2 rounded-2xl px-8 py-7 text-[15px] focus:outline-none focus:bg-white focus:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.1)] transition-all duration-500 placeholder:text-text-muted/40 text-text-secondary shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <label className="block text-[11px] font-[800] text-text-muted uppercase tracking-[0.15em]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#f8f9fa] p-2 rounded-2xl px-8 py-7 text-[15px] focus:outline-none focus:bg-white focus:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.1)] transition-all duration-500 placeholder:text-text-muted/40 text-text-secondary shadow-sm"
                  />
                </div>

                <div className="space-y-8">
                  <label className="block text-[11px] font-[800] text-text-muted uppercase tracking-[0.15em]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-[#f8f9fa] p-2 rounded-2xl px-8 py-7 text-[15px] focus:outline-none focus:bg-white focus:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.1)] transition-all duration-500 placeholder:text-text-muted/40 text-text-secondary resize-none shadow-sm"
                    required
                  />
                </div>

                <div className="pt-10">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95 transition-all duration-500 group relative overflow-hidden z-20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <span className="relative p-2 z-10">Send Message</span>
                    <Send className="w-5 h-5 relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Map Integration */}
            <div className="w-full md:w-1/2 min-hight-[350px] md:min-h-full relative overflow-hidden group/map">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3651.902!2d90.410!3d23.770!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s&q=23.770315,90.410076"
                width="100%"
                height="100%"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/map:scale-110"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-l border-white/10 hidden md:block"></div>
            </div>
          </div>

          <div className="bg-[#f8f9fa] py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div
                className="
        flex
        flex-wrap
        justify-center
        md:justify-between
        items-start
        gap-8
        md:gap-16
        text-center
      "
              >
                {/* Address */}
                <div className="flex flex-col items-center space-y-4 w-full sm:w-1/2 md:w-auto ">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Address</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Gulshan 2 গুলশান ২,
                    <br />
                    Dhaka 1212
                  </p>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center space-y-4 w-full sm:w-1/2 md:w-auto ">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Phone</p>
                  <a href="tel:+1235235598" className="text-sm text-primary">
                    + 1235 2355 98
                  </a>
                </div>

                {/* Email */}
                <div className="flex flex-col items-center space-y-4 w-full sm:w-1/2 md:w-auto">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Email</p>
                  <a
                    href="mailto:info@schoologybd.com"
                    className="text-sm text-primary break-all"
                  >
                    schoologybd.com
                  </a>
                </div>

                {/* Website */}
                <div className="flex flex-col items-center space-y-4 w-full sm:w-1/2 md:w-auto ">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Website</p>
                  <a
                    href="https://SchoologyBD.com"
                    target="_blank"
                    className="text-sm text-primary"
                  >
                    SchoologyBD.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultWeight>
  );
};

export default Contact;
