from pytube import YouTube

# Enter the YouTube video URL
url = "https://youtu.be/2Vv-BfVoq4g?si=C_jf2_pYWSnlaUWK"

# Create a YouTube object
yt = YouTube(url)

# Get the highest resolution stream
video = yt.streams.get_highest_resolution ()

# Download the video
video.download ()