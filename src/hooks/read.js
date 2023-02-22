export default function useVoice(utterance) {
  const synth = window.speechSynthesis;
  const utr = new SpeechSynthesisUtterance(utterance);

  function play() {
    if (synth.speaking) return;
    synth.speak(utr);
  }

  function pause() {
    synth.pause();
  }

  function stop() {
    synth.cancel();
  }

  function resume() {
    synth.resume();
  }

  return { play, pause, resume, stop, synth };
}
