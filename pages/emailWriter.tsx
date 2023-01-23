import { useState } from "react";
import Typed from "react-typed";
import { ToastContainer } from "react-toastify";
import { notifySuccess } from "../utils/notification";
import Input from "../components/Input";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const EmailWriter = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFormData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const emailInfo = e.target[0].value;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Example: From this: "I want to make a self car wash because it is good for the town" to this 
      "Self-service car washes have become increasingly popular across the country, and I am confident 
      that the people of our town would appreciate the convenience and cost savings that a self-service car 
      wash would bring. The installation of a self-service car wash would bring several advantages to our town. 
      It would create jobs in the community and provide a service that is both cost-effective and convenient for 
      the town's citizens."
      "Make this email sound more professional: ${emailInfo} like I showed in the example`,
      temperature: 0.6,
      max_tokens: 500,
    });
    setResponse(response.data.choices[0].text);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <ToastContainer />
      <div className="mt-20">
        <h1 className="text-6xl font-bold">
          <div className="flex bg-white">
            Write your <p className="text-orange-500 pl-5"> Perfect email</p>
          </div>
        </h1>
      </div>
      <main className="relative flex flex-1 flex-col items-center justify-center px-20 text-center bg-slate-800 rounded-md m-20 text-white w-9/12 shadow-md shadow-black">
        {loading ? (
          "Thinking ..."
        ) : response !== "" ? (
          <p
            className="mt-3 text-1xl cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(response);
              notifySuccess("Copied to clipboard");
            }}
          >
            <Typed strings={[response]} typeSpeed={25} />
          </p>
        ) : (
          <p className="mt-3 text-2xl">
            Write a short version of your email, we will take care of making it
            look and sound.{" "}
          </p>
        )}

        <Input submitFormData={submitFormData} />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by OpenAI
        </a>
      </footer>
    </div>
  );
};

export default EmailWriter;
