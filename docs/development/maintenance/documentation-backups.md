# Documentation Backup and Restore

This page explains how to use the documentation backup and restore system for the Dokkerr project.

## Overview

The backup system allows you to:

- Create timestamped backups of the entire documentation
- Add descriptions to backups for easier identification
- View a list of all available backups with dates and descriptions
- Restore the documentation from any previous backup

## Backup Scripts Location

The backup and restore scripts are located in the project root directory under:



The scripts available are:

-  - Creates a new backup
-  - Restores from an existing backup

## Creating a Backup

To create a backup of the current documentation:

1. Open a terminal in the project root directory
2. Run the backup script:

   

3. Enter a description for the backup when prompted
4. The script will create a timestamped backup and add it to the backup list