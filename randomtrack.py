import json
import os
import random

# Read the JSON file of tracks
with open('tracks.json', 'r') as f:
    tracks = json.load(f)['tracks']

# Get the list of flag file names
flag_files = os.listdir('Miniflags')

# Generate a random index for the tracks list
random_index = random.randint(0, len(tracks) - 1)

# Retrieve the track object at the random index
track = tracks[random_index]

# Get the corresponding flag file name for the country
flag_filename = f"{track['country']}.webp"

# Check if the flag file exists in the folder
if flag_filename in flag_files:
    flag_path = os.path.join('flags', flag_filename)
    # Display the track name, length, and flag image
    print(f"Track: {track['name']}")
    print(f"Flag: {flag_path}")
else:
    print(f"Could not find flag image for country {track['country']}")
