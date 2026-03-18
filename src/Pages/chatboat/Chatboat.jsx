import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Asset Imports ---
import WEDDING_PKG from '../../assets/PACKAGES/Luvit wedding packages.pdf'
import ENGAGEMENT_PKG from '../../assets/PACKAGES/Luvit engagement packages.pdf'
import BABY_PKG from '../../assets/PACKAGES/Luvit Baby shoot packages.pdf'
import MATERNITY_PKG from '../../assets/PACKAGES/Luvit Meternity shoot packages.pdf'
import PORTFOLIO_PKG from '../../assets/PACKAGES/Luvit Baby shoot packages.pdf'

function Chatboat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [userInput, setUserInput] = useState("")
  const scrollRef = useRef(null)

  const PHONE_NUMBER = "8848212636";
  const INSTAGRAM_URL = "https://www.instagram.com/luvitweds?igsh=MXVmdTR4YTZrYTJhbA%3D%3D&utm_source=qr";
  const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=Hi%20Luvit%20Weds...`;

  const packages = {
    "Wedding": WEDDING_PKG,
    "Engagement": ENGAGEMENT_PKG,
    "Baby Shoot": BABY_PKG,
    "Maternity": MATERNITY_PKG,
    "Portfolio": PORTFOLIO_PKG
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      addBotMessage("Hi! I'm the Luvit Weds assistant. How can I help you today? ✨");
    }
  }

  const addBotMessage = (text, opts = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text, options: opts }]);
    }, 1000);
  }

  // --- BOT KNOWLEDGE BASE ---
  const processUserMessage = (text) => {
    const input = text.toLowerCase();

    if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
      addBotMessage("Hello! Are you looking for a specific shoot package or do you have a question for us?");
    }
    else if (input.includes("price") || input.includes("rate") || input.includes("package") || input.includes("cost") || input.includes("wedding")) {
      addBotMessage("We have dedicated collections for every event. Which one would you like to explore?", Object.keys(packages));
    }
    // Individual Detail: Akash
    else if (input.includes("akash") || (input.includes("who") && input.includes("founder"))) {
      addBotMessage("Akash is the Founder of Luvit Weds. He is a professional photographer based in Calicut and has led our team through over 150+ successful wedding projects!");
    }
    // Individual Detail: Dinnop
    else if (input.includes("dinnop") || input.includes("creative head") || input.includes("co-founder")) {
      addBotMessage("Dinnop is the Co-founder and Creative Head at Luvit Weds. Based in Calicut, he leads our creative vision and ensures every film and photo tells a unique story.");
    }
    // General Team Info
    else if (input.includes("team") || input.includes("members")) {
      addBotMessage("We are a passionate team of 10+ professionals based in Calicut, specialized in capturing timeless wedding memories across Kerala.");
    }
    else if (input.includes("location") || input.includes("where") || input.includes("calicut") || input.includes("kozhikode")) {
      addBotMessage("We are based in Calicut, but our team travels all across Kerala for shoots. Where is your event happening?");
    }
    else if (input.includes("instagram") || input.includes("insta") || input.includes("photo") || input.includes("work")) {
      addBotMessage("You can view our latest work and client stories on our Instagram:", [
        { type: 'link', label: 'Visit Instagram', url: INSTAGRAM_URL, color: '#E1306C' }
      ]);
    }
    else if (input.includes("contact") || input.includes("call") || input.includes("number") || input.includes("whatsapp")) {
      addBotMessage(`You can reach the team directly at ${PHONE_NUMBER}.`, [
        { type: 'link', label: 'Call Now', url: `tel:${PHONE_NUMBER}`, color: '#2d2d2d' },
        { type: 'link', label: 'WhatsApp', url: WHATSAPP_URL, color: '#25D366' }
      ]);
    }
    else {
      addBotMessage("I'm here to help! Would you like to see our packages or speak to us directly?", ["View Packages", "Chat with Human"]);
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const text = userInput;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setUserInput("");
    processUserMessage(text);
  }

  const handleChoice = (choice) => {
    if (choice === "View Packages") {
      addBotMessage("Which session are you interested in?", Object.keys(packages));
      return;
    }
    if (choice === "Chat with Human") {
      window.open(WHATSAPP_URL, '_blank');
      return;
    }
    setMessages(prev => [...prev, { sender: 'user', text: choice }]);
    addBotMessage(`Perfect. Here are the ${choice} package details:`);
    setTimeout(() => {
      addBotMessage(`Download PDF:`, [{ type: 'pdf', label: `Open ${choice} PDF`, url: packages[choice] }]);
    }, 800);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="bg-[#2d2d2d] text-white p-4 rounded-full shadow-2xl flex items-center justify-center border border-white/10"
      >
        <AnimatePresence mode="wait">
          {!isChatOpen ? (
            <motion.div key="chat" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.div>
          ) : (
            <motion.span key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-2xl leading-none">×</motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[320px] md:w-[360px] bg-white border border-black/5 shadow-2xl overflow-hidden flex flex-col rounded-2xl"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="p-4 bg-[#2d2d2d] text-white flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xs font-serif italic border border-white/20">LW</div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#2d2d2d] rounded-full"></div>
              </div>
              <div>
                <h3 className="font-serif text-[15px] tracking-wide italic">Luvit Concierge</h3>
                <p className="text-[9px] uppercase tracking-widest opacity-60">Online</p>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#fcfaf7]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-[13px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-[#2d2d2d] text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none border border-black/5 shadow-sm'
                    }`}>
                    {msg.text}
                    {msg.options && (
                      <div className="mt-3 space-y-1.5">
                        {msg.options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => opt.url ? window.open(opt.url, '_blank') : handleChoice(opt)}
                            className="w-full text-left p-2.5 rounded-lg border border-black/5 text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-black hover:text-white"
                            style={opt.color ? { backgroundColor: opt.color, color: 'white', border: 'none' } : {}}
                          >
                            {opt.label || opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1 p-2">
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-black/5 flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-black/5 rounded-full px-4 py-2 text-[12px] outline-none focus:border-black/20"
              />
              <button
                type="submit"
                className="bg-[#2d2d2d] text-white p-2 rounded-full flex items-center justify-center transition-transform active:scale-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </form>

            {/* Footer Buttons */}
            <div className="px-3 pb-3 bg-white flex gap-2">
              <button onClick={() => window.location.href = `tel:${PHONE_NUMBER}`} className="flex-1 py-2 bg-gray-100 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-gray-200">Call</button>
              <button onClick={() => window.open(WHATSAPP_URL, '_blank')} className="flex-1 py-2 bg-[#25D366] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 hover:opacity-90">WhatsApp</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Chatboat;