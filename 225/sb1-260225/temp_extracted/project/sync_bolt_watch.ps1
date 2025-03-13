# Configuration values
$CONFIG_FILE = "bolt-sync-config.psd1"
$ZIP_PATTERN = "project-bolt-*.zip"
$SYNCED_DIR = "bolt_synced"
$BACKUP_DIR = "bolt_backups"
$TEMP_DIR = "temp_extracted"
$LOG_FILE = "sync_bolt_watch_$(Get-Date -Format 'yyyyMMdd').log"
$SCRIPT_DIR = Get-Location

# Log Function with timestamps
function Log($message, $type="INFO") {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$type] $message"
    Write-Output $logEntry | Tee-Object -FilePath $LOG_FILE -Append
}

# Function to load configuration
function Get-Config {
    if (-Not (Test-Path $CONFIG_FILE)) {
        Log "Configuration file '$CONFIG_FILE' not found." "ERROR"
        exit 1
    }
    try {
        $config = Import-PowerShellDataFile -Path $CONFIG_FILE
        $GIT_REPO_PATH = $config.GIT_REPO_PATH
        $GIT_BRANCH = $config.GIT_BRANCH
        return @{repo=$GIT_REPO_PATH; branch=$GIT_BRANCH}
    }
    catch {
        Log "Failed to load configuration: $_" "ERROR"
        exit 1
    }
}

# Function to compare files using SHA256 hash
function Compare-Files($file1, $file2) {
    if (-Not (Test-Path $file1) -or -Not (Test-Path $file2)) {
        return $false
    }
    $hash1 = (Get-FileHash $file1 -Algorithm SHA256).Hash
    $hash2 = (Get-FileHash $file2 -Algorithm SHA256).Hash
    return $hash1 -eq $hash2
}

# Function to synchronize files
function Sync-Files($gitBranch) {
    Log "Scanning for ZIP files..."
    
    $zipFiles = Get-ChildItem -Path $ZIP_PATTERN
    if ($zipFiles.Count -eq 0) {
        Log "No new ZIP files found. Waiting..."
        return
    }

    $zipFiles | ForEach-Object {
        $zipFile = $_.FullName
        Log "Processing ZIP file: $zipFile"
        try {
            # Clean temporary directory
            if (Test-Path $TEMP_DIR) { Remove-Item $TEMP_DIR -Recurse -Force }
            New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null

            # Extract to temporary directory
            Expand-Archive -Path $zipFile -DestinationPath $TEMP_DIR -Force

            # Backup current files
            $backupTimestamp = Get-Date -Format "yyyyMMdd_HHmmss"
            $currentBackup = Join-Path $BACKUP_DIR "backup_$backupTimestamp"
            New-Item -ItemType Directory -Path $currentBackup | Out-Null
            Get-ChildItem $TEMP_DIR -Recurse | ForEach-Object {
                $relativePath = $_.FullName.Substring($TEMP_DIR.Length)
                $targetPath = Join-Path $SCRIPT_DIR $relativePath

                if (Test-Path $targetPath) {
                    if (-Not (Compare-Files $_.FullName $targetPath)) {
                        # Backup conflicting file
                        $backupFilePath = Join-Path $currentBackup $relativePath
                        $backupDirPath = Split-Path $backupFilePath
                        if (-Not (Test-Path $backupDirPath)) {
                            New-Item -ItemType Directory -Path $backupDirPath -Force | Out-Null
                        }
                        Copy-Item $targetPath $backupFilePath
                        Log "File backed up due to conflict: $targetPath"
                    } else {
                        Log "Identical file detected, skipping overwrite: $targetPath"
                    }
                }
                # Copy new or updated file
                $destDir = Split-Path $targetPath
                if (-Not (Test-Path $destDir)) {
                    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
                }
                Copy-Item $_.FullName -Destination $targetPath -Force
                Log "File copied: $targetPath"
            }

            # Git operations
            git add .
            git commit -m "Automated commit: extracted files from $(Split-Path $zipFile -Leaf) at $backupTimestamp"
            git push origin $gitBranch
            Log "Changes pushed to branch '$gitBranch'."

            # Move ZIP to synced directory
            Move-Item -Path $zipFile -Destination $SYNCED_DIR
            Log "ZIP file moved to $SYNCED_DIR : $zipFile"
        }
        catch {
            Log "Error processing $($zipFile): $($_)" "ERROR"
        }
        finally {
            # Cleanup
            if (Test-Path $TEMP_DIR) { Remove-Item $TEMP_DIR -Recurse -Force }
        }
    }

}

# Main function
function Main {
    Log "Initializing script..."
    $config = Get-Config

    # Ensure required directories exist
    foreach ($dir in @($SYNCED_DIR, $BACKUP_DIR)) {
        if (-Not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir | Out-Null
            Log "Directory created: $dir"
        }
    }

    # Continuous monitoring loop
    while ($true) {
        Sync-Files $config.branch
        Start-Sleep -Seconds 5
    }
}

# Run the main function
Main
