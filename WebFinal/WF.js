
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
        
        document.getElementById('shiftUp').addEventListener('click', () => {
            let max = gear * 20;

        if (clutchEngaged) {
            if (gear === 0) {
                gear = 1;
            } else if (gear < 5 && value >= max - 5) {
                gear++;
            }
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
            if (clutchEngaged) {
                if (gear > 0) {
                    gear--;
                    document.getElementById('gear').textContent = `Current Gear: ${gear}`;
                }
            }
            if (gear === 0) {
                document.getElementById('gear').textContent = `Current Gear: N`;
            } else {
                document.getElementById('gear').textContent = `Current Gear: ${gear}`;
            }
        });

        const brakeButton = document.getElementById('brake');
        let brakeInterval = null;
  
        let gasHeld = false;
        let brakeHeld = false;
        let clutchEngaged = false;


        function startGas() {
        clearInterval(upInterval);
        clearInterval(downInterval);

        upInterval = setInterval(() => {
            let max = gear * 20;
            if (gear > 0 && value < max) {
                value++;
            }
            updateDisplay();
        }, 100);
       }

     
        function stopGas() {
        clearInterval(upInterval);

        downInterval = setInterval(() => {
            let min;
            if (gear === 0) {
                min = 0;
            } else if (gear === 1) {
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
       }

       function startBrake() {
        clearInterval(upInterval);
        clearInterval(downInterval);
        clearInterval(brakeInterval);
        brakeInterval = setInterval(() => {
            let min;
            if (gear === 0) {
                min = 0;
            } else if (gear === 1) {
                min = 1;
            } else {
                min = (gear - 1) * 20;
            }
            if (value > min) {
                value--;
                updateDisplay();
            } else {        
                clearInterval(brakeInterval);
            } 
        }, 100);
         }

        function stopBrake() {
            clearInterval(brakeInterval);
        }

        document.addEventListener('keydown', (e) => {
            let key = e.key.toLowerCase();
            if (key === 'd' && !gasHeld) {
                gasHeld = true;
                document.getElementById('gas').classList.add('pressed');
                startGas();
            } else if (key === 's' && !brakeHeld) {
                brakeHeld = true;
                document.getElementById('brake').classList.add('pressed');
                startBrake();
            } else if (key === 'a' && !clutchEngaged) {
                clutchEngaged = true;
                document.getElementById('clutch').classList.add('pressed');
            } else if (key === 'e') {
                document.getElementById('shiftUp').click();
            } else if (key === 'q') {
                document.getElementById('shiftDown').click();
            }
        });

        document.addEventListener('keyup', (e) => { 
            let key = e.key.toLowerCase();
            if (key === 'd') {
                gasHeld = false;
                document.getElementById('gas').classList.remove('pressed');
                stopGas();
            } else if (key === 's') {
                brakeHeld = false;
                document.getElementById('brake').classList.remove('pressed');
                stopBrake();
            } else if (key === 'a') {
                clutchEngaged = false;
                document.getElementById('clutch').classList.remove('pressed');
            }   
        });