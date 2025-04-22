fetch("https://api.edenai.run/v2/text/code_generation", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTFiOGIyYWYtOTQxZC00ZWRiLWE3NjktNzdhODc2MWZjNjE0IiwidHlwZSI6ImFwaV90b2tlbiJ9.vgip6BEjWx5PPkFR6B1bs_-NpDbBW-XoqqYg7kkJZ6U",
  },
  body: JSON.stringify({
    providers: "openai",
    prompt: "",
    instruction:
      "Write a function in python that tell weather a number is prime",
    temperature: 0.1,
    max_tokens: 500,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
