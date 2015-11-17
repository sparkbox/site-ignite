#!/bin/bash
IP=$(ifconfig | grep 'inet 1' | cut -c 6- | awk 'NR==2 {print $1}')
echo $IP
