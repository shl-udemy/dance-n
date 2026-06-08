# Telegram Bot API Cheatsheet

Using the Telegram Bot API via plain HTTP fetch (no SDK) — as used in this project.

---

## Setup

### Create a bot
1. Open Telegram → search **@BotFather**
2. Send `/newbot` → follow prompts → get your `BOT_TOKEN`
3. Token format: `123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ`

### Add bot to a group
1. Add the bot as a member of the group
2. Send a message in the group
3. Fetch `https://api.telegram.org/bot<TOKEN>/getUpdates` to find the `chat.id`

> Group chat IDs are **negative** (e.g. `-5026849590`). Supergroup IDs start with `-100`.

---

## Base URL

```
https://api.telegram.org/bot<TOKEN>/<METHOD>
```

---

## Send a Message

```ts
await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: "-5026849590",
    text: "Hello from the bot!",
  }),
});
```

### With Markdown formatting

```ts
body: JSON.stringify({
  chat_id: chatId,
  text: "*Bold* _italic_ `code`",
  parse_mode: "Markdown",   // or "MarkdownV2" / "HTML"
})
```

| parse_mode | Syntax |
|---|---|
| `Markdown` | `*bold*` `_italic_` `` `code` `` |
| `MarkdownV2` | Same but special chars must be escaped with `\` |
| `HTML` | `<b>bold</b>` `<i>italic</i>` `<code>code</code>` |

---

## Get Chat ID

**Method 1 — getUpdates** (easiest)
```
GET https://api.telegram.org/bot<TOKEN>/getUpdates
```
Send a message in the group first, then look for `message.chat.id` in the response.

**Method 2 — @RawDataBot**
Add @RawDataBot to the group, it will print the chat ID immediately.

---

## Common Methods

| Method | What it does |
|---|---|
| `sendMessage` | Send a text message |
| `sendPhoto` | Send an image |
| `sendDocument` | Send a file |
| `getMe` | Test auth — returns bot info |
| `getUpdates` | Poll for incoming messages |
| `getChat` | Get info about a chat (including migrated ID) |
| `setChatTitle` | Rename a group (bot must be admin) |

---

## Supergroup Migration

When a regular group is upgraded to a supergroup, its chat ID changes. Telegram returns an error with the new ID:

```json
{
  "ok": false,
  "error_code": 400,
  "description": "Bad Request: group chat was upgraded to a supergroup chat",
  "parameters": { "migrate_to_chat_id": -1001234567890 }
}
```

Handle it by retrying with the new ID:

```ts
if (!res.ok) {
  const json = await res.json();
  if (json?.parameters?.migrate_to_chat_id) {
    const newId = String(json.parameters.migrate_to_chat_id);
    // retry with newId, then update your stored chat ID
  }
}
```

---

## Error Reference

| Code | Description | Fix |
|---|---|---|
| `401 Unauthorized` | Bad token | Check `BOT_TOKEN` |
| `400 Chat not found` | Wrong chat ID | Re-fetch with `getUpdates` |
| `400 Bot was kicked` | Bot removed from group | Re-add the bot |
| `403 Forbidden` | Bot has no permission | Make bot an admin or re-add |
| `429 Too Many Requests` | Rate limited | Respect `retry_after` in response |
| `400 group upgraded to supergroup` | Chat ID changed | See supergroup migration above |

---

## Rate Limits

| Scope | Limit |
|---|---|
| Per bot, per chat | 1 message/second |
| Per bot, broadcast | 30 messages/second |
| Per bot per group/channel | No hard limit but avoid bursts |

Telegram returns `429` with a `retry_after` field (seconds) when exceeded.

---

## Useful Tips

- **Test your token**: `GET https://api.telegram.org/bot<TOKEN>/getMe`
- **Message length**: max 4096 characters per message
- **Bots can't read group messages** unless Privacy Mode is disabled (via BotFather `/setprivacy`)
- **Bot must be admin** to delete messages, pin, or change group info
- **No SDK needed** — the HTTP API is simple enough to use with plain `fetch`

---

## How This Project Uses It

- **File**: `lib/telegram.ts`
- **Auth**: `TELEGRAM_BOT_TOKEN` env var
- **Groups**: Dance-R, Dance-B, Dance-Z (each has its own `TELEGRAM_CHAT_ID_*` env var)
- **On dance request**: sends a formatted Hebrew message to the venue's group
- **On workshop signup**: sends to Dance-B (`TELEGRAM_CHAT_ID_DANCE_B`)
- **On event signup**: sends to `TELEGRAM_CHAT_ID_SIGNUPS`
- **Supergroup migration**: handled automatically — retries with new chat ID on `migrate_to_chat_id` error
