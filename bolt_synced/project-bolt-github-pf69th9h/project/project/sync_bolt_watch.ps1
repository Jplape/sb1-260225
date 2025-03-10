# Configuration values
$CONFIG_FILE = "bolt-sync-config.psd1"
$ZIP_PATTERN = "project-bolt-*.zip"
$SYNCED_DIR = "bolt_synced"
$SCRIPT_DIR = Get-Location

# Function to load configuration
function Load-Config {
    if (-Not (Test-Path $CONFIG_FILE)) {
        Write-Error "Error: Configuration file '$CONFIG_FILE' not found."
        exit 1
    }
    try {
        $config = Import-PowerShellDataFile -Path $CONFIG_FILE
        $GIT_REPO_PATH = $config.GIT_REPO_PATH
        $GIT_BRANCH = $config.GIT_BRANCH
    }
    catch {
        Write-Error "Error: Failed to load configuration from '$CONFIG_FILE'."
        exit 1
    }
}

# Function to synchronize files
function Sync-Files {
    Write-Host "Scanning for ZIP files..."
    $foundZip = $false
    
    Get-ChildItem -Path $ZIP_PATTERN | ForEach-Object {
        $foundZip = $true
        $zipFile = $_.FullName
        Write-Host "Processing ZIP file: $zipFile"

        try {
            # Extract ZIP file
            Expand-Archive -Path $zipFile -DestinationPath $SCRIPT_DIR -Force
            
            # Add extracted files to Git
            git add .
            
            # Commit the changes
            git commit -m "Automated commit: extracted files from $zipFile"
            
            # Push to GitHub
            git push origin main
            
            # Move the ZIP file to the synced directory
            Move-Item -Path $zipFile -Destination $SYNCED_DIR
            
            Write-Host "Processed and moved: $zipFile"
        }
        catch {
            Write-Error "Error processing $($zipFile): $($_.Exception.Message)"
        }
    }

    if (-Not $foundZip) {
        Write-Host "No new ZIP files found. Waiting..."
    }
}

# Main function
function Main {
    Write-Host "Initializing script..."
    Load-Config

    # Ensure the synced directory exists
    if (-Not (Test-Path $SYNCED_DIR)) {
        New-Item -ItemType Directory -Path $SYNCED_DIR | Out-Null
    }

    # Monitor the directory for ZIP files in a loop
    while ($true) {
        Sync-Files
        Start-Sleep -Seconds 5
    }
}

# Run the main function
Main
