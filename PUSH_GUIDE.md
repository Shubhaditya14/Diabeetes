# Git Push Guide

This guide provides steps to successfully push your local Git repository to a remote GitLab repository.

## 1. Verify Remote URL

Ensure your local repository is configured to push to the correct remote GitLab repository.

To check your current remote(s):
```bash
git remote -v
```

If the remote URL is incorrect or not set, you can either add a new remote or change an existing one:

**To add a new remote (e.g., named 'origin'):**
```bash
git remote add origin git@gitlab.com:your-username/your-repository.git
```
Replace `your-username` and `your-repository.git` with your actual GitLab username and repository name.

**To change an existing remote's URL (e.g., 'origin'):**
```bash
git remote set-url origin git@gitlab.com:your-username/your-repository.git
```
Again, replace with your correct details.

## 2. Ensure SSH Key Configuration

The most common reason for push failures is incorrect SSH key setup.

*   **Generate an SSH key (if you don't have one):**
    ```bash
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```
    Follow the prompts. It's usually best to accept the default file location (`~/.ssh/id_ed25519`).

*   **Add your SSH public key to GitLab:**
    1.  Copy your public key:
        ```bash
        cat ~/.ssh/id_ed25519.pub
        ```
    2.  Go to your GitLab profile settings (usually `User Settings -> SSH Keys`).
    3.  Paste the copied public key into the "Key" field and add a descriptive "Title".
    4.  Click "Add key".

*   **Add your SSH private key to the SSH agent:**
    ```bash
    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519
    ```
    If your private key has a different name or path, adjust accordingly.

*   **Test your SSH connection to GitLab:**
    ```bash
    ssh -T git@gitlab.com
    ```
    You should see a welcome message. If you get a permission denied error, your SSH setup is still incorrect.

## 3. Push Your Changes

Once your remote is set and SSH keys are configured, you can push your changes.

**First, ensure your local repository is up-to-date and your changes are committed:**
```bash
git status
git add .
git commit -m "Your meaningful commit message"
```

**Then, push to your remote repository:**
```bash
git push -u origin main
```
If your branch is not `main`, replace it with your current branch name (e.g., `master`, `development`). The `-u` flag sets the upstream branch, so future pushes can be done with just `git push`.