import { useState } from "react";
// import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  AiOutlineSend,
  AiOutlineCopy,
  AiOutlineCheck,
  AiOutlineRobot,
} from "react-icons/ai";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const ForgeCopilot = () => {
  const [instruction, setInstruction] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for mobile: Create a hidden textarea
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedIndex(index);
      toast.success("Copied To ClipBoard");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };
  const generateCode = async () => {
    if (!instruction.trim()) return;

    const userMessage = { role: "user", content: instruction };
    setMessages([...messages, userMessage]);
    setInstruction("");
    setLoading(true);
    setError(null);

    try {
      // const response = await fetch(
      //   "https://api.edenai.run/v2/text/code_generation",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       authorization:
      //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTFiOGIyYWYtOTQxZC00ZWRiLWE3NjktNzdhODc2MWZjNjE0IiwidHlwZSI6ImFwaV90b2tlbiJ9.vgip6BEjWx5PPkFR6B1bs_-NpDbBW-XoqqYg7kkJZ6U",
      //     },
      //     body: JSON.stringify({
      //       providers: "openai",
      //       prompt: "",
      //       instruction: instruction,
      //       temperature: 0.1,
      //       max_tokens: 500,
      //     }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const data = await response.json();

      await new Promise((resolve) => setTimeout(resolve, 10000));
      const data = {
        openai: {
          generated_text:
            " a prime number or not.\n" +
            "\n" +
            "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.\n" +
            "\n" +
            "Here's a simple function to check if a number is prime:\n" +
            "\n" +
            "```python\n" +
            "def is_prime(n):\n" +
            "    if n <= 1:\n" +
            "        return False\n" +
            "    if n <= 3:\n" +
            "        return True\n" +
            "    if n % 2 == 0 or n % 3 == 0:\n" +
            "        return False\n" +
            "    i = 5\n" +
            "    while i * i <= n:\n" +
            "        if n % i == 0 or n % (i + 2) == 0:\n" +
            "            return False\n" +
            "    return True\n" +
            "    return True\n" +
            "```\n" +
            "\n" +
            "This function first checks if the number is less than or equal to 1, in which case it is not prime. It then checks if the number is 2 or 3, which are prime numbers. For numbers greater than 3, it checks divisibility by 2 and 3. If the number is not divisible by 2 or 3, it uses a loop to check divisibility by numbers of the form 6k ± 1 up to the square root of the number. This is an efficient way to determine if a number is prime.",
          status: "success",
          usage: {
            completion_tokens: 281,
            prompt_tokens: 272,
            total_tokens: 553,
            completion_tokens_details: [Object],
            prompt_tokens_details: [Object],
          },
          cost: 0.0034900000000000005,
        },
      };

      const botMessage = {
        role: "bot",
        content: data.openai?.generated_text || "No response received.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <div
          className="flex-1 p-6 space-y-4 m-4 overflow-y-auto max-h-[75vh] sm:max-h-[85vh] scrollbar-none
                 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 
                 bg-[#0d1117] border border-gray-700 rounded-xl shadow-lg"
        >
          {messages.length === 0 && !loading && !error && (
            <div className="flex justify-center items-center h-full text-gray-400 sm:text-4xl text-2xl animate-pulse">
              🤖 What can I help you with?
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end sm:justify-end"
                  : "justify-start sm:justify-start"
              }`}
            >
              <div
                className={`relative w-fit  p-4 rounded-lg max-w-3xl text-sm sm:text-base transition-all 
                        ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white self-end"
                            : "bg-gray-800 text-gray-200 self-start"
                        }`}
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-invert ">
                    <spna
                      className="w-6 h-6 rounded-full 
                inline-flex items-center justify-center 
                bg-white"
                    >
                      <AiOutlineRobot className="text-gray-700" />
                    </spna>
                    <SyntaxHighlighter
                      className="scrollbar-none w-[280px] sm:w-full max-w-full
                       text-xs sm:text-sm md:text-base p-2 sm:p-4 !overflow-x-auto sm:flex-wrap"
                      language="markdown"
                      style={dracula}
                      wrapLongLines
                    >
                      {msg.content}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}

                {/* Copy Button (Only for Bot Messages) */}
                {msg.role === "bot" && (
                  <button
                    className="copy-btn absolute top-2 right-2 text-white hover:text-white p-1 rounded-md 
                            transition-all bg-green-600 hover:bg-green-900 active:scale-90 
                            z-10 pointer-events-auto"
                    onClick={() => copyToClipboard(msg.content, index)}
                  >
                    {copiedIndex === index ? (
                      <AiOutlineCheck className="w-5 h-5" />
                    ) : (
                      <AiOutlineCopy className="w-5 h-5" />
                    )}
                    {/* <AiOutlineCopy className="w-5 h-5" /> */}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="p-4 flex items-center rounded-lg bg-gray-700 text-gray-300 animate-pulse ">
                Generating
                <div className="flex justify-start ml-1">
                  <div className="h-3 w-3 bg-red-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-3 w-3 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                  <div className="h-3 w-3 bg-green-300 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex justify-start">
              <div className="p-4 rounded-lg bg-red-600 text-white">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-6 sm:p-9 m-4 sm:m-9 rounded-2xl my-auto bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-lg flex flex-col sm:flex-row items-center gap-4">
          <textarea
            className="scro w-full flex-1 p-1 bg-gray-700 text-white rounded-lg border border-gray-600 
               focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none 
               placeholder-gray-400 transition-all duration-300 scrollbar-none"
            rows="2"
            placeholder="Ask something..."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          ></textarea>

          <button
            className={`flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 
              hover:from-blue-600 hover:to-purple-700 text-white font-semibold 
              px-6 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
              transform hover:scale-105 active:scale-95 
              disabled:opacity-50 disabled:cursor-not-allowed 
              w-full sm:w-auto`}
            onClick={generateCode}
            disabled={loading}
          >
            <AiOutlineSend className="w-6 h-6" />
            <span>Send</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgeCopilot;
