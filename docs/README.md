# Dokkerr Documentation

This directory contains the documentation for the Dokkerr application, built with [MkDocs](https://www.mkdocs.org/) and the [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme.

## Local Development

To work with the documentation locally:

1. Install MkDocs and required plugins:
   ```bash
   pip install mkdocs-material
   pip install mkdocs-git-revision-date-localized-plugin
   pip install mkdocs-minify-plugin
   ```

2. Serve the documentation locally:
   ```bash
   mkdocs serve
   ```

3. View the documentation at http://localhost:8000

## Documentation Structure

The documentation is organized into the following sections:

- **Getting Started**: Installation, configuration, and basic usage
- **Features**: Detailed information about application features
- **Architecture**: System architecture and design
- **Technical**: Technical implementation details
- **Development**: Guidelines for developers
- **Deployment**: Deployment instructions
- **Operations**: Operational procedures
- **Security**: Security guidelines

## Contributing to Documentation

1. Create or edit Markdown files in the appropriate directories
2. Preview your changes locally using `mkdocs serve`
3. Commit your changes and push to the repository
4. The documentation will be automatically deployed to GitHub Pages

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by a GitHub Actions workflow defined in `.github/workflows/deploy-docs.yml`.

## Migrated from VitePress

This documentation was migrated from VitePress to MkDocs. If you find any issues with the migration, please report them or submit a pull request. 