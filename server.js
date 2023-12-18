// app.js
const express = require("express");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

let reqCount = 0;
const PORT = process.env.PORT || 8080;
app.set("trust proxy", true);

app.use(express.static(__dirname + "/src"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/index.html");
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/userdata", async (req, res) => {
  try {
    const question = req.body.query;

    async function main(ques) {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
      });

      const prompt =
        "# I am gonna give you a word or sentence or prompt, somehow establish a connection with the number 7.\
      # For Example: \
      2023 = 2+2+3 =7, Spandan = 7 letters, \
      Gaurav = 1st letter G = 7th letter, \
      Sunset has 6 letters + 1 word = 7,\
      Rohit: The sum of the numerical positions of the letters (R=18, O=15, H=8, I=9, T=20) is 70, and 7 + 0 = 7, \
      Had break up with Girlfriend: You had break up with your gf because your luck was on 7th planet\
      #GENERATE WITH ANY ONE OF TRICK FROM THE ABOVE, SOMETIMES ROAST IN THE RESPONSE\
      #KINDLY RECHECK AND VERIFY IF THE LOGIC IS CORRECT OR NOT(ATLEAST THE MATHEMATICAL LOGICS)\
      ## DON'T GENERATE MORE THAN 1 SENTENCE\n HERE IS MY WORD: " + question;

      const result = await model.generateContentStream(prompt);
      const response = await result.response;
    //   const text = response.text();

      let text = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
      }


      res.send(text);
      reqCount += 1;
      console.log(reqCount, question, ":", text);
    }

    main(question);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Application started and Listening on port ${PORT}`);
});
