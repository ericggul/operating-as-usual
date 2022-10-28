export async function analyseVoice({ handleSucceed, handleRetry }) {
  const GRAMMAR_LIST = [`I'm`, "not", "really", "a", "human"];

  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  if (window.SpeechGrammarList) {
    const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
    const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${GRAMMAR_LIST.join(" | ")};`;
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
  }

  recognition.lang = "en-GB";
  recognition.start();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const includes = ["human", "not", "really"].every((word) => event.results[0][0].transcript.includes(word));
    if (includes) {
      handleSucceed();
    } else {
      handleRetry(event.results[0][0].transcript);
    }
  };
}
