---
title: Git Workflow
description: Documentation for Dokkerr's Git workflow and branching strategy
---

# Git Workflow

## Overview

Dokkerr follows a trunk-based development workflow with feature branches and automated CI/CD pipelines. This document outlines our Git practices, branch management, and release procedures.

## Branch Structure

```mermaid
gitGraph
    commit
    branch develop
    checkout develop
    commit
    branch feature/user-auth
    checkout feature/user-auth
    commit
    commit
    checkout develop
    merge feature/user-auth
    branch feature/payments
    checkout feature/payments
    commit
    checkout develop
    merge feature/payments
    checkout main
    merge develop
    branch hotfix/security
    checkout hotfix/security
    commit
    checkout main
    merge hotfix/security
```

### Branch Types

```typescript
interface BranchTypes {
  main: {
    purpose: 'Production-ready code',
    protection: true,
    requiresApproval: true
  };
  develop: {
    purpose: 'Integration branch for features',
    protection: true,
    requiresApproval: true
  };
  feature: {
    pattern: 'feature/*',
    purpose: 'New features and enhancements',
    protection: false
  };
  bugfix: {
    pattern: 'bugfix/*',
    purpose: 'Bug fixes for upcoming release',
    protection: false
  };
  hotfix: {
    pattern: 'hotfix/*',
    purpose: 'Critical production fixes',
    protection: false
  };
  release: {
    pattern: 'release/*',
    purpose: 'Release preparation',
    protection: true
  };
}
```

## Development Workflow

### Starting New Work

```bash
# 1. Update develop branch
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/user-notifications

# 3. Make changes and commit
git add .
git commit -m "feat(notifications): implement push notifications"

# 4. Push branch
git push -u origin feature/user-notifications
```

### Code Review Process

```typescript
interface PullRequestTemplate {
  title: string;
  description: {
    summary: string;
    changes: string[];
    testing: string;
    screenshots?: string[];
  };
  checklist: {
    documentation: boolean;
    tests: boolean;
    linting: boolean;
    accessibility: boolean;
  };
  reviewers: string[];
  labels: string[];
}

const prTemplate = {
  title: 'feat(notifications): implement push notifications',
  description: {
    summary: 'Add Firebase Cloud Messaging for push notifications',
    changes: [
      'Implement FCM integration',
      'Add notification preferences',
      'Update user settings UI'
    ],
    testing: 'Added unit tests and integration tests'
  },
  checklist: {
    documentation: true,
    tests: true,
    linting: true,
    accessibility: true
  },
  reviewers: ['@tech-lead', '@senior-dev'],
  labels: ['feature', 'notifications']
};
```

### Merge Requirements

```typescript
interface MergeRequirements {
  checks: {
    ci: boolean;
    codeReview: boolean;
    testsPass: boolean;
    lintingPass: boolean;
    conflictsResolved: boolean;
  };
  approvals: {
    required: number;
    fromCodeOwners: boolean;
  };
  updates: {
    branchUpToDate: boolean;
    changelogUpdated: boolean;
  };
}
```

## Release Process

### Version Control

```typescript
interface VersioningStrategy {
  pattern: 'MAJOR.MINOR.PATCH';
  rules: {
    major: 'Breaking changes',
    minor: 'New features',
    patch: 'Bug fixes'
  };
  tags: {
    format: 'v1.2.3',
    signed: true,
    annotated: true
  };
}

class ReleaseManager {
  static async prepareRelease(version: string) {
    // 1. Create release branch
    await git.checkout('develop');
    await git.createBranch(`release/${version}`);
    
    // 2. Update version
    await this.updateVersion(version);
    
    // 3. Update changelog
    await this.updateChangelog(version);
    
    // 4. Create release commit
    await git.commit(`chore(release): prepare ${version}`);
    
    // 5. Create tag
    await git.tag(`v${version}`, 'Release ' + version);
  }
}
```

### Changelog Management

```typescript
interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    added: string[];
    changed: string[];
    deprecated: string[];
    removed: string[];
    fixed: string[];
    security: string[];
  };
}

const changelogTemplate = {
  version: '1.2.0',
  date: '2024-03-07',
  changes: {
    added: [
      'Push notification support',
      'User notification preferences'
    ],
    changed: [
      'Updated notification UI',
      'Improved error handling'
    ],
    fixed: [
      'Fixed notification delivery issues'
    ]
  }
};
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
      - name: Install dependencies
        run: npm ci
      - name: Lint code
        run: npm run lint
      - name: Run tests
        run: npm run test
      - name: Build
        run: npm run build

  deploy:
    needs: validate
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: npm run deploy
```

## Best Practices

### Commit Guidelines

```typescript
interface CommitMessage {
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';
  scope?: string;
  description: string;
  body?: string;
  breaking?: boolean;
  closes?: string[];
}

const commitExamples = [
  {
    message: 'feat(auth): add multi-factor authentication',
    description: 'New feature with scope'
  },
  {
    message: 'fix: handle null response in search',
    description: 'Bug fix without scope'
  },
  {
    message: 'BREAKING CHANGE: remove deprecated API endpoints',
    description: 'Breaking change'
  }
];
```

### Code Review Guidelines

1. **Review Checklist**
   - Code follows style guide
   - Tests are included
   - Documentation is updated
   - Performance impact considered
   - Security implications reviewed

2. **Review Etiquette**
   - Be constructive and respectful
   - Focus on code, not the author
   - Explain reasoning for changes
   - Respond to comments promptly

3. **Common Review Points**
   - Code readability
   - Error handling
   - Edge cases
   - Security concerns
   - Performance implications

## Troubleshooting

Common Git issues and solutions:

1. **Merge Conflicts**
   ```bash
   # 1. Update branches
   git fetch origin
   git checkout feature-branch
   git rebase origin/develop
   
   # 2. Resolve conflicts
   # Edit conflicted files
   git add .
   git rebase --continue
   ```

2. **Undo Changes**
   ```bash
   # Undo last commit
   git reset --soft HEAD^
   
   # Undo commits but keep changes
   git reset --soft HEAD~3
   
   # Discard all local changes
   git reset --hard origin/develop
   ```

3. **Branch Management**
   ```bash
   # Clean up local branches
   git fetch -p
   git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
   
   # Force update branch
   git fetch origin
   git reset --hard origin/develop
   ``` 