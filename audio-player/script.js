document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.getElementById('audio-element');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const volumeControl = document.getElementById('volume');
    const progressBar = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    // 自動再生のためのボタン表示（autoplay属性が効かない場合のため）
    const autoplayButton = document.createElement('button');
    autoplayButton.textContent = '自動再生を有効にする';
    autoplayButton.className = 'control-btn';
    autoplayButton.style.marginTop = '1rem';
    autoplayButton.style.width = '100%';
    document.querySelector('.audio-player').appendChild(autoplayButton);

    // 自動再生ボタンクリックイベント
    autoplayButton.addEventListener('click', function() {
        audioElement.play().then(() => {
            autoplayButton.style.display = 'none';
        }).catch(error => {
            console.error('自動再生が許可されていません：', error);
        });
    });

    // 再生ボタン
    playBtn.addEventListener('click', function() {
        audioElement.play();
    });

    // 一時停止ボタン
    pauseBtn.addEventListener('click', function() {
        audioElement.pause();
    });

    // 停止ボタン
    stopBtn.addEventListener('click', function() {
        audioElement.pause();
        audioElement.currentTime = 0;
        updateProgressBar();
    });

    // 音量コントロール
    volumeControl.addEventListener('input', function() {
        audioElement.volume = volumeControl.value;
    });

    // オーディオが読み込まれたとき
    audioElement.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audioElement.duration);
        // エラーハンドリング
        if (isNaN(audioElement.duration)) {
            durationDisplay.textContent = '不明';
        }
    });

    // オーディオ再生中
    audioElement.addEventListener('timeupdate', function() {
        updateProgressBar();
        currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
    });

    // プログレスバーの更新
    function updateProgressBar() {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // 時間のフォーマット（秒→分:秒）
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // エラーハンドリング
    audioElement.addEventListener('error', function() {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = '音声ファイルの読み込みに失敗しました。voice.mp3ファイルが正しく配置されているか確認してください。';
        errorMessage.style.color = 'red';
        document.querySelector('.info').appendChild(errorMessage);
    });

    // audioタグのsrc属性の有効性をチェック
    if (!audioElement.src || audioElement.src === window.location.href) {
        const warningMessage = document.createElement('p');
        warningMessage.textContent = '音声ファイルが見つかりませんでした。voice.mp3ファイルをこのHTMLと同じディレクトリに配置してください。';
        warningMessage.style.color = 'orange';
        document.querySelector('.info').appendChild(warningMessage);
    }
}); 
