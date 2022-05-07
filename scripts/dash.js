const videoElement = document.querySelector('.videoContainer video')
const url1 = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'
const url2 =
	'https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/Sintel/sintel_480p_heaac2_0.mpd'
const url3 = 'https://storage.googleapis.com/shaka-demo-assets/angel-one-widevine/dash.mpd'

function init(url) {
	const player = dashjs.MediaPlayer().create()

	player.updateSettings({
		streaming: {
			buffer: {
				fastSwitchEnabled: true,
			},
		},
	})

	player.initialize(videoElement, url, true)
	const controlbar = new ControlBar(player)
	controlbar.initialize()

	// setInterval(console.log(player.getPlaybackRate()), 5000)
}

init(url1)
// setInterval(() => console.log(dashjs.MediaPlayer.getPlaybackRate()), 5000)

videoElement.addEventListener('click', () => {
	if (videoElement.paused) {
		const chart = setInterval(() => initChart(), 10000)
		videoElement.play()
	} else {
		clearInterval(chart)
		videoElement.pause()
	}
})

const changeTheme = () => {
	const root = document.querySelector(':root')
	const styles = getComputedStyle(document.body)

	const bg = styles.getPropertyValue('--white-color')
	const font = styles.getPropertyValue('--black-color')
	root.style.setProperty('--black-color', bg)
	root.style.setProperty('--white-color', font)
}

const quality = [2, 1, 2, 2, 3, 2, 1, 2]
let q = 0

let xValues = [10, 20, 30, 40, 50, 60]
let yValues = [0, 1, 2, 3, 2, 2, 1, 2]

const initChart = () => {
	new Chart('myChart', {
		type: 'line',
		data: {
			labels: xValues,
			datasets: [
				{
					fill: false,
					lineTension: 0,
					backgroundColor: 'rgba(0,0,255,1.0)',
					borderColor: 'rgba(0,0,255,0.1)',
					data: yValues,
				},
			],
		},
		options: {
			legend: { display: false },
			scales: {
				yAxes: [{ ticks: { min: 0, max: 3 } }],
			},
		},
	})

	for (let i = 0; i < xValues.length; i++) {
		xValues[i] = xValues[i] + 10
	}
	console.log(xValues)

	for (let i = 0; i < yValues.length - 1; i++) {
		yValues[i] = yValues[i + 1]
	}
	console.log(xValues)

	if (q < quality.length) q += 1
	else q = 0

	yValues[yValues.length - 1] = quality[q]
}

const chart = setInterval(() => initChart(), 10000)
