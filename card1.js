document.addEventListener("DOMContentLoaded", function () {
    const cake = document.querySelector(".cake");
    const messageDisplay = document.getElementById("message");
    let audioContext;
    let analyser;
    let microphone;
  
    // Function to place a single candle in the center of the cake
    function addCenterCandle() {
      const candle = document.createElement("div");
      candle.className = "candle";
      candle.style.left = "50%";
      candle.style.top = "30%";
      candle.style.transform = "translate(-50%, -50%)";
  
      const flame = document.createElement("div");
      flame.className = "flame";
      candle.appendChild(flame);
  
      cake.appendChild(candle);
    }
  
    function isBlowing() {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
  
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      let average = sum / bufferLength;
  
      return average > 40; // Threshold for blowing out
    }
  
    function blowOutCandle() {
      const candle = document.querySelector(".candle");
      if (candle && !candle.classList.contains("out") && isBlowing()) {
        candle.classList.add("out");
        messageDisplay.textContent = "Happy 23rd Birthday!";
          // Change the GIFs after the candle is blown out
          cat1.src = "gif/eat.gif";  // New gif for cat1
          cat2.src = "gif/please.gif";  // New gif for cat2
      }
    }
  
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          analyser = audioContext.createAnalyser();
          microphone = audioContext.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          setInterval(blowOutCandle, 200);
        })
        .catch(function (err) {
          console.log("Unable to access microphone: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  
    // Add the center candle when the page loads
    addCenterCandle();

    
  });
  