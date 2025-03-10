#!/bin/bash

# Default configuration values
CONFIG_FILE="bolt-sync-config.ini"  # Fichier de configuration par défaut
ZIP_PATTERN="project-bolt-*.zip"    # Motif pour les fichiers ZIP
SYNCED_DIR="bolt_synced"            # Répertoire pour la synchronisation
SCRIPT_DIR=$(pwd)                   # Chemin absolu du répertoire du script

# Function to load configuration
load_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "Error: Configuration file '$CONFIG_FILE' not found." >&2
        exit 1
    fi
    source "$CONFIG_FILE" || {
        echo "Error: Failed to load configuration from '$CONFIG_FILE'." >&2
        exit 1
    }
}

# Function to synchronize files
sync_files() {
    echo "Scanning for ZIP files..."
    found_zip=false
    
    for zip_file in $ZIP_PATTERN; do
        if [ -f "$zip_file" ]; then
            found_zip=true
            echo "Processing ZIP file: $zip_file"

            # Extract ZIP file
            unzip -o "$zip_file" -d "$SCRIPT_DIR" || {
                echo "Error: Failed to extract $zip_file" >&2
                continue
            }

            # Add extracted files to Git
            git add . || {
                echo "Error: Failed to stage files for commit." >&2
                continue
            }

            # Commit the changes
            git commit -m "Automated commit: extracted files from $zip_file" || {
                echo "Error: Failed to commit changes." >&2
                continue
            }

            # Push to GitHub
            git push origin main || {
                echo "Error: Failed to push changes to GitHub." >&2
                continue
            }

            # Move the ZIP file to the synced directory
            mv "$zip_file" "$SYNCED_DIR" || {
                echo "Error: Failed to move $zip_file to $SYNCED_DIR" >&2
                continue
            }

            echo "Processed and moved: $zip_file"
        fi
    done
    # Si aucun ZIP n'a été trouvé dans cette itération
    if [ "$found_zip" = false ]; then
        echo "No new ZIP files found. Waiting..."
    fi
}

# Main function
main() {
    echo "Initializing script..."
    load_config

    # Ensure the synced directory exists
    if [ ! -d "$SYNCED_DIR" ]; then
        mkdir -p "$SYNCED_DIR"
    fi

    # Monitor the directory for ZIP files in a loop
    while true; do
        sync_files
        sleep 5  # Pause for 5 seconds before scanning again
    done
}

# Run the main function
main "$@"
