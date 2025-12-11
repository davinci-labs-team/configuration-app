# Deployment Guide

This guide explains how to deploy the configuration app using public Docker images for both backend and frontend, and how to set up the environment variables for a successful Supabase connection.

---

## 1. Prerequisites

- Docker and Docker Compose installed
- Access to your Supabase instance (hosted or self-hosted)
- Your Supabase **Instance URL** and **Service Key**

---

## 2. Deploying the Backend

You need to use the officials image for the backend that is `ghcr.io/davinci-labs-team/hackathon-backend:latest`. You can deploy it using Docker Compose or a simple Docker command.

Note that you need to setup supasbase first as you will need the credentials to connect the backend to supabase.

---

## 3. Deploying the Frontend

For the frontend, use the official image `ghcr.io/davinci-labs-team/hackathon-front:latest`. Similar to the backend, you can deploy it using Docker Compose or a Docker command.

---

## 4. Deploying the Discord Bot

For the discord bot it's exatly the same as the backend and frontend. You need to use the official image `ghcr.io/davinci-labs-team/discord-bot:latest`.

Do not forget to setup the environment variables for the discord bot to connect to both supabase and discord.

More information about the discord bot setup can be found in the [Discord Integration Guide](docs/Discord.md).

---

## 5. Environment Variables (ENV) Setup

To ensure the frontend connects to the backend, provide the correct Supabase credentials.

**Required values:**

- `SUPABASE_URL` — Your Supabase instance URL (e.g., `https://xyzcompany.supabase.co`)
- `SUPABASE_SERVICE_KEY` — Your Supabase service role key

**Example `.env` file:**

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_SERVICE_KEY=your-service-role-key
```

---

## 6. Verifying the Connection

1. Open the frontend in your browser.
2. On the Supabase connection screen, the app will use the values from your environment variables.
3. If the connection fails, double-check your URL and Service Key.

---

## 7. References

- [Supabase Docker Images](https://hub.docker.com/u/supabase)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

You are now ready to deploy your configuration app!
