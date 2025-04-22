import { useEffect, useState } from "react";
import CodeEditor from "@monaco-editor/react";
import { HiPlay } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
const Editor = () => {
  const [code, setCode] = useState("");
  const [lang, setLang] = useState(null);
  const [data, setData] = useState(null);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setData(data.project);
          setLang(data.project.projLanguage);
          setCode(data.project.code);
        } else {
          toast.error(data.msg);
        }
      });
  }, []);

  const saveProject = () => {
    fetch(api_base_url + "/saveProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
        code: code,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      });
  };
  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  };

  // Add and clean up keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [code]);

  const runProject = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename:
              data.name + data.projLanguage === "python"
                ? ".py"
                : data.projLanguage === "java"
                ? ".java"
                : data.projLanguage === "javascript"
                ? ".js"
                : data.projLanguage === "c"
                ? ".c"
                : data.projLanguage === "cpp"
                ? ".cpp"
                : data.projLanguage === "bash"
                ? ".sh"
                : "",
            content: code,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOutput(data.run.output);
        setError(data.run.code === 1 ? true : false);
      });
  };
  // return (
  //   <>
  //     <NavBar />
  //     <div
  //       className="flex items-center justify-between"
  //       style={{ height: "calc(100vh - 90px)" }}
  //     >
  //       <div className="left w-[50%] h-full">
  //         <CodeEditor
  //           onChange={(newCode) => setCode(newCode)}
  //           theme="vs-dark"
  //           height="100%"
  //           width="100%"
  //           language={lang}
  //           value={code}
  //         />
  //       </div>

  //       <div className="right p-[15px] w-[50%] h-full bg-[#27272a]">
  //         <div className="flex border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
  //           <p className="p-0 m-0">Output</p>

  //           <button
  //             onClick={runProject}
  //             className="text-3xl text-blue-500 hover:text-blue-700"
  //           >
  //             <HiPlay />
  //           </button>
  //         </div>
  //         <pre className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`}>
  //           {output}
  //         </pre>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row items-center justify-between h-[calc(100vh-90px)]">
        {/* Code Editor Section */}
        <div className="left w-full md:w-[50%] h-[50vh] md:h-full">
          <CodeEditor
            onChange={(newCode) => setCode(newCode)}
            theme="vs-dark"
            height="100%"
            width="100%"
            language={lang}
            value={code}
          />
        </div>

        {/* Output Section */}
        <div className="right p-[15px] w-full md:w-[50%] h-[50vh] md:h-full bg-[#27272a]">
          <div className="flex border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[30px]">
            <p className="p-0 m-0">Output</p>
            <button
              onClick={runProject}
              className="text-3xl text-blue-500 hover:text-blue-700"
            >
              <HiPlay />
            </button>
          </div>
          <pre
            className={`w-full p-6 max-h-[35vh] md:max-h-[75vh] overflow-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-blue-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-700
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"  ${
    error ? "text-red-500" : ""
  }`}
          >
            {output}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Editor;
