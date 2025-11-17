# Discord Bot Setup Guide

This guide will help you create a Discord application, configure your bot for user install only, set up the required permissions and scopes, and obtain your OAuth2 token. You will also learn how to set the correct redirect URI for your app.

---

## 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**.
3. Enter a name for your application and click **Create**.
4. On the application page, note your **Application ID** (you will need this later).

---

## 2. Set Up the Bot for User Install Only

1. In your application, go to the **Bot** tab on the left sidebar.
2. If you haven't already, click **Add Bot** and confirm.
3. Under **Privileged Gateway Intents**, enable only the intents you need (for slash commands, you typically do not need privileged intents).

---

## 3. Set Default Install Settings

1. Go to the **OAuth2** > **URL Generator** tab.
2. Under **Scopes**, select:
    - `bot`
    - `applications.commands`
3. Under **Bot Permissions**, select:
    - `Use Slash Commands`
    - `Administrator` (or only the permissions your bot needs)

> **Note:** Granting `Administrator` gives full permissions. Only use this if your bot requires it. For most bots, `Use Slash Commands` and specific permissions are enough.

---

## 4. Set the Redirect URI

1. In the **OAuth2** > **General** tab, scroll to **Redirects**.
2. Add your redirect URI:
    - `https://your-domain.com/api/auth/github/callback`
    - Replace `your-domain.com` with your actual domain.
3. Click **Save Changes**.

---

## 5. Get Your OAuth2 Token

1. In the **Bot** tab, click **Reset Token** (if you haven't generated one yet).
2. Copy the **token** and keep it safe. You will use this in your application to authenticate the bot.

---

## 6. Invite the Bot to Your Server

1. Go back to the **OAuth2** > **URL Generator**.
2. Copy the generated URL and open it in your browser.
3. Select your server and authorize the bot with the selected permissions.

---

You have now set up your Discord application and bot with the correct permissions and redirect URI!
