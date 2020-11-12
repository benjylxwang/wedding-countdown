#!/bin/bash



gst-launch-1.0 filesrc location=$1.mp4 ! decodebin ! videoflip method=counterclockwise ! videoconvert ! x264enc! mp4mux! filesink location=$1_H.mp4
