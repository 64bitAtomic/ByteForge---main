exports.getStartupCode = (language) => {
  if (language.toLowerCase() === "python") {
    return 'print("Hello World")';
  } else if (language.toLowerCase() === "java") {
    return 'public class Main {\n  public static void main(String[] args) {\n System.out.println("Hello World");  \n} \n}';
  } else if (language.toLowerCase() === "javascript") {
    return 'console.log("Hello World");';
  } else if (language.toLowerCase() === "cpp") {
    return '#include <iostream>\nint main() {\nstd::cout << "Hello World" << std::endl;\n    return 0;\n}';
  } else if (language.toLowerCase() === "c") {
    return '#include <stdio.h>\n\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}';
  } else if (language.toLowerCase() === "go") {
    return 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}';
  } else if (language.toLowerCase() === "bash") {
    return 'echo "Hello World"';
  } else {
    return "Language not supported";
  }
};
