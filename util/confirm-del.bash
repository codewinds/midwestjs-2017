#!/bin/bash

set -e

echo "This will ERASE your EXERCISE and SOLUTIONS files"
echo "to rebuild from the master. Continue? (enter 'ERASE' to continue)"
echo "Type Control-C to abort"
read response
if [ "$response" != "ERASE" ]; then
    echo "Exiting without change"
    exit 1
fi
