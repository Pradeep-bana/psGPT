const chatLog = document.getElementById('chat-log');
const chatInput = document.getElementById('chat-input');

  
function addMessageToLog(message, sender) {
  const messageElem = document.createElement('p');
  messageElem.classList.add('from-me');
  messageElem.classList.add(sender);
  messageElem.innerHTML = message;
  chatLog.appendChild(messageElem);
  
  // Highlight any code blocks in the message
  const codeBlocks = messageElem.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    hljs.highlightBlock(block);
    
    // Add copy code functionality
    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy';
    copyButton.classList.add('copy-button');
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(block.innerText);
      copyButton.innerText = 'Copied!';
      setTimeout(() => {
        copyButton.innerText = 'Copy';
      }, 1000);
    });
    block.parentNode.insertBefore(copyButton, block);
  });
}

function processUserInput() {
    const userInput = chatInput.value.trim(); // remove leading/trailing whitespace
    if (userInput === "") {
        return
    }
    if (userInput.toLowerCase() == "who developed you" || userInput.toLowerCase() == "who invented you" || userInput.toLowerCase() == "what is your name" || userInput.toLowerCase() == "who is pradeep singh" || userInput.toLowerCase() == "who are you" || userInput.toLowerCase() == "pradeep singh" || userInput.toLowerCase() == "pradeep bana" || userInput.toLowerCase() == "pradeep" || userInput.toLowerCase() == "pradip") {
      const aiResponse = 'Thanks to Pradeep Singh. They developed me. I am an Artificial Inteligence and My name is Jarvis';
      addMessageToLog(userInput, 'user');
      const chatLogLine = document.createElement("p");
      chatLogLine.classList.add("ai");

      chatLogLine.innerText = aiResponse;
      
      const hljsLine = document.createElement("p");
      hljsLine.classList.add("hljs");
      hljsLine.appendChild(document.createTextNode(aiResponse));

      const chatLogContainer = document.createElement("p");
      chatLogContainer.classList.add("from-them");
      chatLogContainer.appendChild(hljsLine);
      chatLog.appendChild(chatLogContainer);
      return;
    }
    
    addMessageToLog(userInput, 'user');
  
    // Send user input to GPT-3 and get a response
    const apiKey = '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'; // replace with your actual API key
    const prompt = `User: ${userInput}\nAI:`;
    const url = 'https://api.openai.com/v1/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      prompt: prompt,
      max_tokens: 1500,
      n: 1,
      stop: 'User:',
      model: 'gpt-3.5-turbo-instruct'
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
         console.log(json); // add this line
        const aiResponse = json.choices[0].text;
        console.log(aiResponse);
        const chatLogLine = document.createElement("p");
        chatLogLine.classList.add("ai");

        chatLogLine.innerText = aiResponse;
       
        const hljsLine = document.createElement("p");
        hljsLine.classList.add("hljs");
        hljsLine.appendChild(document.createTextNode(aiResponse));

        const chatLogContainer = document.createElement("p");
        chatLogContainer.classList.add("from-them");
        chatLogContainer.appendChild(hljsLine);
        chatLog.appendChild(chatLogContainer);
        
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    chatInput.value = '';
  }
  /*Startin voice code */
  function processVoiceInput() {
    document.getElementById('voice-button').src='micon.png';
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();
  
    recognition.addEventListener('result', event => {
      const speechToText = event.results[0][0].transcript.trim();
      console.log('Speech Recognition result:', speechToText);
      if (speechToText === "") {
        return
      }
    if (speechToText.toLowerCase() == "who developed you" || speechToText.toLowerCase() == "who invented you" || speechToText.toLowerCase() == "what is your name" || speechToText.toLowerCase() == "who is pradeep singh" || speechToText.toLowerCase() == "who are you" || speechToText.toLowerCase() == "pradeep singh" || speechToText.toLowerCase() == "pradeep bana" || speechToText.toLowerCase() == "pradeep" || speechToText.toLowerCase() == "pradip") {
      const aiResponse = 'Thanks to Pradeep Singh. He developed me. I am an Artificial Inteligence and My name is Jarvis';
      addMessageToLog(speechToText, 'user');
      const chatLogLine = document.createElement("p");
      chatLogLine.classList.add("ai");

      chatLogLine.innerText = aiResponse;
      
      const hljsLine = document.createElement("p");
      hljsLine.classList.add("hljs");
      hljsLine.appendChild(document.createTextNode(aiResponse));

      const chatLogContainer = document.createElement("p");
      chatLogContainer.classList.add("from-them");
      chatLogContainer.appendChild(hljsLine);
      chatLog.appendChild(chatLogContainer);
      return;
    }

    addMessageToLog(speechToText, 'user');
  
    // Send user input to GPT-3 and get a response
    const apiKey = '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'; // replace with your actual API key
    const prompt = `User: ${speechToText}\nAI:`;
    const url = 'https://api.openai.com/v1/completions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    const data = {
      prompt: prompt,
      max_tokens: 1500,
      n: 1,
      stop: 'User:',
      model: 'gpt-3.5-turbo-instruct'
    };
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json); // add this line
        const aiResponse = json.choices[0].text;
        console.log(aiResponse);
        const chatLogLine = document.createElement("p");
        chatLogLine.classList.add("ai");

        chatLogLine.innerText = aiResponse;
        
        const hljsLine = document.createElement("p");
        hljsLine.classList.add("hljs");
        hljsLine.appendChild(document.createTextNode(aiResponse));

        const chatLogContainer = document.createElement("p");
        chatLogContainer.classList.add("from-them");
        chatLogContainer.appendChild(hljsLine);
        chatLog.appendChild(chatLogContainer);
        
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
    chatInput.value = '';

    });
    


    recognition.addEventListener('end', () => {
      document.getElementById('voice-button').src='micoff.png';
      recognition.stop();
      console.log('Speech recognition stopped');
    });
  }
  
  const voiceButton = document.getElementById('voice-button');
  voiceButton.addEventListener('click', processVoiceInput);
  
  const sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', processUserInput);  
  chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      processUserInput();
    }
  });




