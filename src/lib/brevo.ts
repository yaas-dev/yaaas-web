type NewsletterStatus = 'SUBSCRIBED' | 'UNSUBSCRIBED';

type BrevoContactInput = {
  email: string;
  firstName?: string;
  status: NewsletterStatus;
  subscribedAt?: Date | string | null;
  unsubscribedAt?: Date | string | null;
  allowResubscribe?: boolean;
};

export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

export async function syncBrevoContact(contact: BrevoContactInput) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  if (!apiKey) return { configured: false, synced: false };
  if (contact.status === 'SUBSCRIBED' && (!Number.isInteger(listId) || listId <= 0)) {
    throw new Error('BREVO_LIST_ID is missing or invalid.');
  }

  const email = contact.email.trim().toLowerCase();
  const isSubscribed = contact.status === 'SUBSCRIBED';
  const url = isSubscribed
    ? 'https://api.brevo.com/v3/contacts'
    : `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`;

  const response = await fetch(url, {
    method: isSubscribed ? 'POST' : 'PUT',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(isSubscribed
      ? {
          email,
          attributes: contact.firstName ? { FNAME: contact.firstName } : {},
          listIds: [listId],
          ...(contact.allowResubscribe ? { emailBlacklisted: false } : {}),
          updateEnabled: true,
        }
      : { emailBlacklisted: true }),
    cache: 'no-store',
  });

  // An unsubscribed local record may never have been added to Brevo.
  if (!isSubscribed && response.status === 404) {
    return { configured: true, synced: true, skipped: true };
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo contact sync failed (${response.status}): ${detail.slice(0, 400)}`);
  }

  return { configured: true, synced: true };
}

export async function registerBrevoUnsubscribeWebhook() {
  const apiKey = process.env.BREVO_API_KEY;
  const token = process.env.BREVO_WEBHOOK_TOKEN;
  if (!apiKey || !token) throw new Error('Add BREVO_API_KEY and BREVO_WEBHOOK_TOKEN to Vercel first.');

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://yaaas.co').replace(/\/$/, '');
  const webhookUrl = `${baseUrl}/api/newsletter/brevo-webhook`;

  const listResponse = await fetch('https://api.brevo.com/v3/webhooks?type=marketing', {
    headers: { 'api-key': apiKey, Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!listResponse.ok) {
    const detail = await listResponse.text();
    throw new Error(`Could not check existing Brevo webhooks (${listResponse.status}): ${detail.slice(0, 500)}`);
  }

  const listData = await listResponse.json();
  const existing = (listData.webhooks || []).find((item: any) =>
    item.url === webhookUrl && item.type === 'marketing'
  );

  if (existing) {
    const updateResponse = await fetch(`https://api.brevo.com/v3/webhooks/${existing.id}`, {
      method: 'PUT',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        type: 'marketing',
        events: ['unsubscribed'],
        auth: { type: 'bearer', token },
      }),
      cache: 'no-store',
    });
    if (!updateResponse.ok) {
      const detail = await updateResponse.text();
      throw new Error(`Could not update the existing Brevo unsubscribe webhook (${updateResponse.status}): ${detail.slice(0, 500)}`);
    }
    return { created: false };
  }

  const createResponse = await fetch('https://api.brevo.com/v3/webhooks', {
    method: 'POST',
    headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      type: 'marketing',
      events: ['unsubscribed'],
      description: 'YAAAS website newsletter unsubscribe sync',
      auth: { type: 'bearer', token },
    }),
    cache: 'no-store',
  });
  if (!createResponse.ok) {
    const detail = await createResponse.text();
    throw new Error(`Could not create Brevo webhook (${createResponse.status}): ${detail.slice(0, 500)}`);
  }
  return { created: true };
}
