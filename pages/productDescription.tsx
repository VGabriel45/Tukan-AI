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
    const product = e.target[0].value;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a product description for the following product: ${product}`,
      temperature: 0.7,
      max_tokens: 1500,
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
            Get your{" "}
            <p className="text-orange-500 pl-5"> Product description</p>
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
            Tell us about your product, we will come up with a description for
            it.{" "}
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
