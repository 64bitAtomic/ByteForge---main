import { useEffect, useState } from "react";
import Select from "react-select";
import { api_base_url } from "../helper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const IDE = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const [username, setUsername] = useState("Default");
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      borderColor: "#555",
      color: "#fff",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#000",
      color: "#fff",
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#333" : "#000",
      color: "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash",
    ];

    const options = data
      .filter((runtime) => filteredLanguages.includes(runtime.language))
      .map((runtime) => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const getUserName = () => {
    fetch(api_base_url + "/username", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
    })
      .then((res) => res.json())
      .then((data) => setUsername(data.username));
  };
  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName("");
          navigate("/editor/" + data.project);
        } else {
          toast.error(data.msg);
        }
      });
  };
  const [projects, setProjects] = useState(null);
  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.projects);
          setProjects(data.projects);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };
  useEffect(() => {
    getUserName();
    getProjects();
    getRunTimes();
  }, []);

  const deleteProject = (id) => {
    let confirmation = confirm("Are you sure you want to delete this project?");
    if (confirmation) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token"),
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            getProjects();
          } else {
            toast.error(data.msg);
          }
        });
    }
  };
  const [editProjectId, setEditProjectId] = useState("");

  const updateProject = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: editProjectId,
        token: localStorage.getItem("token"),
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsEditModelShow(false);
          setName("");
          setEditProjectId("");
          getProjects();
        } else {
          toast.error(data.msg);
          setIsEditModelShow(false);
          setName("");
          setEditProjectId("");
          getProjects();
        }
      });
  };

  return (
    <>
      <NavBar />
      <div className="p-2 md:ml-[20px] transition-all md:mr-[20px] bg-gray-900">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <h3 className="username text-2xl sm:text-left ">👋Hi, {username}</h3>
          <div className="flex items-center">
            <button
              onClick={() => setIsCreateModelShow(true)}
              className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 sm:w-auto "
            >
              Create Project
            </button>
          </div>
        </div>
        <div className="projects mt-5 space-y-4 pb-10">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="project p-4 flex flex-col sm:flex-row items-center sm:justify-between bg-[#0f0e0e] rounded-lg shadow-lg "
                  >
                    <div
                      onClick={() => {
                        navigate("/editor/" + project._id);
                      }}
                      className="flex w-full items-center gap-4 text-center sm:text-left"
                    >
                      {project.projLanguage === "python" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "javascript" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "cpp" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "c" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "java" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png"
                            alt=""
                          />
                        </>
                      ) : project.projLanguage === "bash" ? (
                        <>
                          <img
                            className="w-[130px] h-[100px] object-cover"
                            src="https://w7.pngwing.com/pngs/48/567/png-transparent-bash-shell-script-command-line-interface-z-shell-shell-rectangle-logo-commandline-interface-thumbnail.png"
                            alt=""
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <div>
                        <h3 className="text-xl">{project.name}</h3>
                        <p className="text-sm text-[gray]">
                          {new Date(project.date).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto justify-center">
                      <button
                        onClick={() => {
                          setIsEditModelShow(true);
                          setEditProjectId(project._id);
                          setName(project.name);
                        }}
                        className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProject(project._id);
                        }}
                        className="btnNormal bg-red-500 transition-all hover:bg-red-600 w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="min-h-screen flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-gray-900 text-white rounded-2xl shadow-lg p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.5L3.5 9.75m0 0L9.75 16m-6.25-6.25h16.5m-6.25-6.25L20.5 9.75m0 0L14.25 16"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold">No Projects Found</h2>
                  <p className="text-gray-400 mt-2">
                    Start a new project and bring your ideas to life.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {isCreateModelShow ? (
          <div
            onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsCreateModelShow(false);
              }
            }}
            className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50"
          >
            <div className="modelCon flex flex-col items-start rounded-xl p-[20px] w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[25vw] h-auto bg-[#0f0f0e]">
              <h3 className="text-xl font-bold text-center mb-4">
                Create Project
              </h3>
              <div className="inputBox w-full">
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="w-full p-2 rounded bg-[#1f1f1e] text-white"
                />
              </div>
              <Select
                placeholder="Select a Language"
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
                className="w-full mt-3"
              />
              {selectedLanguage && (
                <>
                  <p className="text-[14px] text-green-500 mt-2">
                    Selected Language: {selectedLanguage.label}
                  </p>
                  <button
                    onClick={createProj}
                    className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2 w-full"
                  >
                    Create
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {isEditModelShow ? (
          <div
            onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsEditModelShow(false);
                setName("");
              }
            }}
            className="modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50"
          >
            <div className="modelCon flex flex-col items-start rounded-xl p-[20px] w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[25vw] h-auto bg-[#0f0f0e]">
              <h3 className="text-xl font-bold text-center mb-4">
                Update Project
              </h3>
              <div className="inputBox w-full">
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Enter your project name"
                  className="w-full p-2 rounded bg-[#1f1f1e] text-white"
                />
              </div>

              <button
                onClick={updateProject}
                className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2 w-full"
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default IDE;
