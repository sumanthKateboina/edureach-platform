import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.tsx";
import ChatDrawer from "./ChatDrawer.tsx";
import SignupPopup from "./SignupPopup.tsx";

export default function FloatingChatButton() {
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      setChatOpen(!chatOpen);
    } else {
      setSignupOpen(true);
    }
  };

  return (
    <>
      {/* RAG Drawer */}
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Lock Trigger Modal */}
      <SignupPopup isOpen={signupOpen} onClose={() => setSignupOpen(false)} />

      {/* Floating trigger button */}
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-108 active:scale-95 transition-all duration-300 ${
          chatOpen ? "bg-gray-700 hover:bg-gray-800 rotate-90" : "bg-maroon hover:bg-maroon-light"
        }`}
        title={user ? "Chat with EduReach Assistant" : "Create profile to access RAG assistant"}
      >
        {chatOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white animate-pulse" />
        )}
      </button>
    </>
  );
}
