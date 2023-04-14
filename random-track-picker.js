const trackContainer = document.getElementById('track-container');
const pickTrackBtn = document.getElementById('pick-track-btn');
const flagImg = document.getElementById('flag-img');
const trackMapImg = document.getElementById('track-map-img');

let isPickingTrack = false;

// Set the default splash image and track map image
flagImg.src = 'splash.png';
trackMapImg.src = 'blank.png';

// Load the list of tracks from the JSON file
fetch('tracks.json')
  .then(response => response.json())
  .then(data => {
    const tracks = data.tracks;
    // Add a click event listener to the button to pick a random track
    pickTrackBtn.addEventListener('click', () => {
      if (isPickingTrack) {
        return;
      }
      isPickingTrack = true;
      // Set the flag image to the default splash image
      flagImg.src = 'splash.png';
      trackMapImg.src = 'blank.png'      

      // Display the countdown
      let counter = 3;
      const intervalId = setInterval(() => {
        counter--;
        if (counter > 0) {
          // Pick a random GIF for the countdown
          const randomGif = `countdown${Math.floor(Math.random() * 3) + 1}.gif`;
          flagImg.src = randomGif;
          document.querySelector('h2').textContent = '';
          document.querySelector('h3').textContent = '';
        } else {
          clearInterval(intervalId);
          // Generate a random index for the tracks list
          const randomIndex = Math.floor(Math.random() * tracks.length);
          // Retrieve the track object at the random index
          const track = tracks[randomIndex];
          // Get the corresponding flag image file path for the country
          const flagFilename = `${track.country}.png`;
          // Display the flag image and track map
          flagImg.src = `flags/${flagFilename}`;
          trackMapImg.src = `tracks/${track.nickname}.png`;
          // Create a container element for the track information
          const trackInfoContainer = document.createElement('div');
          // Create a heading element for the track name
          const trackNameHeading = document.createElement('h2');
          trackNameHeading.textContent = track.name;
          // Create a heading element for the track nickname
          const trackNicknameHeading = document.createElement('h3');
          trackNicknameHeading.textContent = track.nickname;
          // Add the flag image and track name to the container
          trackInfoContainer.appendChild(flagImg);
          trackInfoContainer.appendChild(trackNameHeading);
          trackInfoContainer.appendChild(trackNicknameHeading);
          // Replace the contents of the track container with the new track information
          trackContainer.innerHTML = '';
          trackContainer.appendChild(trackInfoContainer);
          isPickingTrack = false;
        }
      }, 1000);
    });
  })
  .catch(error => {
    console.error(`Failed to load tracks: ${error}`);
    trackContainer.innerHTML = '<p>Failed to load tracks. Please try again later.</p>';
  });
