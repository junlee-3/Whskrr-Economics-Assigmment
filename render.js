const videoElement = document.querySelector('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('videoSelectBtn');
videoSelectBtn.onclick = getVideoSources;

const { desktopCapturer, remote  } = require('electron');
const { Menu } = remote;
async function getVideoSources() {
    const inputSources = await desktopCapturer.getSources({
        types: ['window', 'screen']
    });
    const videoOptionsMenu = Menu.buildFromTemplate((
        inputSources.map(({name, id, thumbnail}) => {
            return {
                label: name,
                click: () => {
                    videoSelectBtn.innerText = name;
                    videoSelectBtn.setAttribute('data-id', id);
                    videoSelectBtn.setAttribute('data-thumbnail', thumbnail);
                }
            }
        }
    ))
}