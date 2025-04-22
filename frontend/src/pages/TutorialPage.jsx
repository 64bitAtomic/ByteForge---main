// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { api_base_url } from "../helper";
// import NavBar from "../components/NavBar";
// import { marked } from "marked";
// import hljs from "highlight.js";
// import "github-markdown-css/github-markdown-dark.css";
// import "highlight.js/styles/github-dark.css";
// import { toast } from "react-toastify";
// import Footer from "../components/Footer";

// // Configure marked to use highlight.js
// marked.setOptions({
//   highlight: (code, lang) => {
//     return lang && hljs.getLanguage(lang)
//       ? hljs.highlight(code, { language: lang }).value
//       : hljs.highlightAuto(code).value;
//   },
// });

// const TutorialPage = () => {
//   const { language, title } = useParams();
//   const [tutorial, setTutorial] = useState({ markdown: "", url: "" });
//   const [loading, setLoading] = useState(true); // Added loading state

//   console.log("Lang: ", title);

//   // Fetch tutorials
//   useEffect(() => {
//     document.title = `${title.substring(1)} Tutorials - ByteForge`;
//     const fetchTutorials = async () => {
//       try {
//         const res = await fetch(`${api_base_url}/api/tutorials/all`);
//         if (!res.ok) throw new Error("Failed to fetch tutorials");
//         const data = await res.json();

//         const url = data.tutorial
//           .flatMap((item) => item.topics)
//           .find(
//             (topic) => topic.title === title.substring(1, title.length)
//           )?.urlToMarkdown;

//         if (url) setTutorial((prev) => ({ ...prev, url }));
//       } catch (error) {
//         console.error("Error fetching tutorials:", error);
//       }
//     };

//     fetchTutorials();
//   }, [language, title]);

//   // Fetch markdown content
//   useEffect(() => {
//     if (!tutorial.url) return;

//     setLoading(true); // Start loading before fetching

//     fetch(tutorial.url)
//       .then((res) => res.text())
//       .then((text) => {
//         setTutorial((prev) => ({ ...prev, markdown: text }));
//         setLoading(false); // Stop loading after fetching
//       })
//       .catch((err) => {
//         console.error("Error fetching markdown:", err);
//         setLoading(false);
//       });
//   }, [tutorial.url]);

//   // Highlight code and add copy buttons
//   useEffect(() => {
//     if (!loading) {
//       hljs.highlightAll();
//       setTimeout(addCopyButtons, 100);
//     }
//   }, [tutorial.markdown, loading]);

//   // Function to add copy buttons
//   const addCopyButtons = () => {
//     document.querySelectorAll("pre").forEach((preBlock) => {
//       if (preBlock.parentNode.classList.contains("relative")) return; // Avoid duplicate wrapping

//       const button = document.createElement("button");
//       button.className =
//         "copy-button bg-[#238636] text-white px-2 py-1 rounded absolute top-2 right-2 text-sm";
//       button.innerHTML = copyIcon;
//       button.onclick = () => copyCode(preBlock, button);

//       const wrapper = document.createElement("div");
//       wrapper.className = "relative";

//       preBlock.parentNode.insertBefore(wrapper, preBlock);
//       wrapper.appendChild(preBlock);
//       wrapper.appendChild(button);
//     });
//   };

//   // Copy-to-clipboard function
//   const copyCode = (preBlock, button) => {
//     const code = preBlock.querySelector("code").innerText;
//     navigator.clipboard.writeText(code).then(() => {
//       button.innerHTML = copiedIcon;
//       toast.info("Copied to clipboard", { autoClose: 2000 });

//       setTimeout(() => (button.innerHTML = copyIcon), 2000);
//     });
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-[#0d1117] text-white">
//         <NavBar />
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
//           <h1 className="text-center text-[#c792ea] text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-6 tracking-wide">
//             {title.substring(1)}
//           </h1>

//           {/* Loading Spinner */}
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-10">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
//               <p className="text-gray-400 mt-3">Loading tutorial...</p>
//             </div>
//           ) : (
//             <article className="markdown-body text-sm sm:text-base leading-relaxed sm:leading-loose">
//               <div
//                 dangerouslySetInnerHTML={{ __html: marked(tutorial.markdown) }}
//               />
//             </article>
//           )}
//         </div>
//       </div>
//       <Footer />

//       {/* Tailwind Trick to Keep Absolute Positioning Classes */}
//       <div className="hidden absolute top-2 right-2"></div>
//     </>
//   );
// };

// // Icons for copy and copied states
// const copyIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-7-9h6a2 2 0 012 2v6m-6-11l7 7" />
//   </svg>`;

// const copiedIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m4-5v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h6m2 0l4 4m0 0l-4-4m4 4H13" />
//   </svg>`;

// export default TutorialPage;












import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import NavBar from "../components/NavBar";
import { marked } from "marked";
import hljs from "highlight.js";
import html2pdf from "html2pdf.js";
import "github-markdown-css/github-markdown-dark.css";
import "highlight.js/styles/github-dark.css";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

// Configure marked to use highlight.js
marked.setOptions({
  highlight: (code, lang) => {
    return lang && hljs.getLanguage(lang)
      ? hljs.highlight(code, { language: lang }).value
      : hljs.highlightAuto(code).value;
  },
});

const TutorialPage = () => {
  const { language, title } = useParams();
  const [tutorial, setTutorial] = useState({ markdown: "", url: "" });
  const [loading, setLoading] = useState(true);

  // Fetch tutorials
  useEffect(() => {
    document.title = `${title.substring(1)} Tutorials - ByteForge`;
    const fetchTutorials = async () => {
      try {
        const res = await fetch(`${api_base_url}/api/tutorials/all`);
        if (!res.ok) throw new Error("Failed to fetch tutorials");
        const data = await res.json();

        const url = data.tutorial
          .flatMap((item) => item.topics)
          .find(
            (topic) => topic.title === title.substring(1, title.length)
          )?.urlToMarkdown;

        if (url) setTutorial((prev) => ({ ...prev, url }));
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, [language, title]);

  // Fetch markdown content
  useEffect(() => {
    if (!tutorial.url) return;

    setLoading(true);

    fetch(tutorial.url)
      .then((res) => res.text())
      .then((text) => {
        setTutorial((prev) => ({ ...prev, markdown: text }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching markdown:", err);
        setLoading(false);
      });
  }, [tutorial.url]);

  // Highlight code and add copy buttons
  useEffect(() => {
    if (!loading) {
      hljs.highlightAll();
      setTimeout(addCopyButtons, 100);
    }
  }, [tutorial.markdown, loading]);

  const addCopyButtons = () => {
    document.querySelectorAll("pre").forEach((preBlock) => {
      if (preBlock.parentNode.classList.contains("relative")) return;

      const button = document.createElement("button");
      button.className =
        "copy-button bg-[#238636] text-white px-2 py-1 rounded absolute top-2 right-2 text-sm";
      button.innerHTML = copyIcon;
      button.onclick = () => copyCode(preBlock, button);

      const wrapper = document.createElement("div");
      wrapper.className = "relative";

      preBlock.parentNode.insertBefore(wrapper, preBlock);
      wrapper.appendChild(preBlock);
      wrapper.appendChild(button);
    });
  };

  const copyCode = (preBlock, button) => {
    const code = preBlock.querySelector("code").innerText;
    navigator.clipboard.writeText(code).then(() => {
      button.innerHTML = copiedIcon;
      toast.info("Copied to clipboard", { autoClose: 2000 });

      setTimeout(() => (button.innerHTML = copyIcon), 2000);
    });
  };

  const downloadPDF = () => {
    const markdownContent = document.getElementById("markdown-container");
  
    // Clone content to avoid modifying the live DOM
    const clonedContent = markdownContent.cloneNode(true);
  
    // Remove any light-theme classes, just in case
    clonedContent.classList.remove("github-markdown");
    clonedContent.classList.add("github-markdown-dark");
  
    // Create a dark wrapper for margins and background
    const wrapper = document.createElement("div");
    wrapper.style.background = "#0d1117"; // dark background for margin
    wrapper.style.padding = "40px"; // space around content
  
    // Optional: style tweaks to ensure proper dark theme rendering
    const style = document.createElement("style");
    style.innerHTML = `
      .github-markdown-dark {
        background: #0d1117 !important;
        color: #c9d1d9 !important;
        padding: 20px;
        border-radius: 8px;
      }
      .github-markdown-dark pre, .github-markdown-dark code {
        background-color: #161b22 !important;
        color: #e6edf3 !important;
      }
      .copy-button {
        display: none !important;
      }
    `;
    clonedContent.appendChild(style);
  
    wrapper.appendChild(clonedContent);
    document.body.appendChild(wrapper);
  
    const opt = {
      margin: 0,
      filename: `${title.substring(1)}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
  
    html2pdf()
      .set(opt)
      .from(wrapper)
      .save()
      .then(() => {
        document.body.removeChild(wrapper); // Cleanup
      });
  };
  

  return (
    <>
      <div className="min-h-screen bg-[#0d1117] text-white">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex items-center justify-center flex-wrap gap-4 mb-4 sm:mb-6">
            <h1 className="text-[#c792ea] text-3xl sm:text-5xl font-extrabold tracking-wide">
              {title.substring(1)}
            </h1>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
              <p className="text-gray-400 mt-3">Loading tutorial...</p>
            </div>
          ) : (
            <article
              className="markdown-body github-markdown-dark text-sm sm:text-base leading-relaxed sm:leading-loose"
              id="markdown-container"
            >
              <div
                dangerouslySetInnerHTML={{ __html: marked(tutorial.markdown) }}
              />
            </article>
          )}
          {!loading && (
              <button
                onClick={downloadPDF}
                className="bg-[#238636] items-center justify-center  text-white px-4 py-2 rounded text-sm hover:bg-[#2ea043] transition-all"
              >
                Download PDF
              </button>
            )}
        </div>
        
      </div>
      <Footer />

      <div className="hidden absolute top-2 right-2"></div>
    </>
  );
};

// Icons for copy and copied states
const copyIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-7-9h6a2 2 0 012 2v6m-6-11l7 7" />
  </svg>`;

const copiedIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 inline">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m4-5v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h6m2 0l4 4m0 0l-4-4m4 4H13" />
  </svg>`;

export default TutorialPage;
