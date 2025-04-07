document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-to-speak');
    const voiceSelect = document.getElementById('voice-select');
    const rateInput = document.getElementById('rate');
    const rateValue = document.getElementById('rate-value');
    const pitchInput = document.getElementById('pitch');
    const pitchValue = document.getElementById('pitch-value');
    const speakBtn = document.getElementById('speak-btn');

    // 利用可能な音声を取得
    let voices = [];

    function populateVoiceList() {
        voices = speechSynthesis.getVoices();
        
        // selectをクリア
        voiceSelect.innerHTML = '<option value="">音声を選択してください</option>';
        
        voices.forEach(function(voice, i) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${voice.name} (${voice.lang})`;
            
            // 日本語の音声があれば優先的に選択
            if (voice.lang.includes('ja-JP')) {
                option.selected = true;
            }
            
            voiceSelect.appendChild(option);
        });
    }

    // 音声リストが変更された場合
    speechSynthesis.addEventListener('voiceschanged', populateVoiceList);

    // 初期化
    populateVoiceList();

    // スライダーの値を表示
    rateInput.addEventListener('input', function() {
        rateValue.textContent = rateInput.value;
    });

    pitchInput.addEventListener('input', function() {
        pitchValue.textContent = pitchInput.value;
    });

    // 話すボタンがクリックされた時
    speakBtn.addEventListener('click', function() {
        // すでに再生中の音声があれば停止
        speechSynthesis.cancel();

        if (textInput.value !== '') {
            const utterance = new SpeechSynthesisUtterance(textInput.value);
            
            // 選択された音声があれば設定
            if (voiceSelect.value !== '') {
                utterance.voice = voices[voiceSelect.value];
            }
            
            // 速度と高さを設定
            utterance.rate = parseFloat(rateInput.value);
            utterance.pitch = parseFloat(pitchInput.value);
            
            // 音声再生
            speechSynthesis.speak(utterance);
        }
    });
}); 
