
        let value = 0;
        let upInterval = null;
        let downInterval = null;
        let gear = 0;

        const button = document.getElementById('gas');
        const display = document.getElementById('value');

        const volumeDisplay = document.getElementById('volume');
        const setVolumeButton = document.getElementById('setVolume');

         setVolumeButton.addEventListener('click', () => {
            volumeDisplay.textContent = `Volume: ${value}`;
        });

        function updateDisplay() {
            display.textContent = value;

            let max = gear * 20;
            if (gear > 0 && value >= max - 5) {
                display.classList.add('redline');
            } else {
                display.classList.remove('redline');
            }
        }

        button.addEventListener('mousedown', () => {
            clearInterval(upInterval);
            clearInterval(downInterval);

            upInterval = setInterval(() => {
            let max = gear * 20;
             if (gear > 0 && value < max) {
                    value++;
                }
                updateDisplay();
            }, 100);
        });

        button.addEventListener('mouseup', () => {
            clearInterval(upInterval);
            clearInterval(downInterval);

                downInterval = setInterval(() => {
                  let min;
                  if (gear === 0){
                    min = 0;
                  } else if (gear === 1){
                    min = 1;
                  } else {
                    min = (gear - 1) * 20;
                  }

                  if (value > min) {
                    value--;
                    updateDisplay();
                } else {
                    clearInterval(downInterval);
                } 
            }, 300);
        });

        button.addEventListener('mouseleave', () => {
            clearInterval(upInterval);
            clearInterval(downInterval);

            downInterval = setInterval(() => {
                  let min;
                  if (gear === 0){
                    min = 0;
                  } else if (gear === 1){
                    min = 1;
                  } else {
                    min = (gear - 1) * 20;
                  }

                  if (value > min) {
                    value--;
                    updateDisplay();
                } else {
                    clearInterval(downInterval);
                } 
            }, 300);
        }); 

        document.getElementById('shiftUp').addEventListener('click', () => {
            let max = gear * 20;
            if (gear === 0) {
                gear = 1;
            } else if (gear < 5 && value >= max - 5) {
                gear++;
            }

            if (gear === 0) {
                document.getElementById('gear').textContent = `Current Gear: N`;
            } else {
                document.getElementById('gear').textContent = `Current Gear: ${gear}`;
            }
        });

           document.getElementById('reset').addEventListener('click', () => {
            clearInterval(upInterval);
            clearInterval(downInterval);
            value = 0;
            gear = 0;
            updateDisplay();
            document.getElementById('gear').textContent = `Current Gear: ${gear}`;
        });

        document.getElementById('shiftDown').addEventListener('click', () => {
            if (gear > 0) {
                gear--;
                document.getElementById('gear').textContent = `Current Gear: ${gear}`;
            }
            if (gear === 0) {
                document.getElementById('gear').textContent = `Current Gear: N`;
            } else {
                document.getElementById('gear').textContent = `Current Gear: ${gear}`;
            }
        });

