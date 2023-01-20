import { useState } from "react";
import Typed from "react-typed";
import { ToastContainer } from "react-toastify";
import { notifySuccess } from "../utils/notification";

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

        <div className="absolute bottom-2 b-0 mt-6 flex max-w-4xl flex-wrap items-center justify-around w-screen">
          <form className="w-full" onSubmit={(e) => submitFormData(e)}>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg w-full">
              <textarea
                id="chat"
                rows={1}
                className="shadow-sm shadow-black block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your email instructions ..."
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-orange-500 dark:hover:bg-gray-200"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
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
