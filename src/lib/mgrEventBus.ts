import { WebhookConfig, WebhookEventLog } from '../types';
import { DEFAULT_WEBHOOK_CONFIG, DEFAULT_WEBHOOK_LOGS } from '../data/mockData';

const CONFIG_KEY = 'chama_mgr_webhook_config';
const LOGS_KEY = 'chama_mgr_webhook_logs';

export function getWebhookConfig(): WebhookConfig {
  const saved = localStorage.getItem(CONFIG_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_WEBHOOK_CONFIG;
}

export function saveWebhookConfig(config: WebhookConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

export function getWebhookLogs(): WebhookEventLog[] {
  const saved = localStorage.getItem(LOGS_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_WEBHOOK_LOGS;
}

export function saveWebhookLogs(logs: WebhookEventLog[]): void {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export async function dispatchMgrEvent(
  tenantId: string,
  event: 'member.synced' | 'contribution.recorded' | 'mgr.rotation_triggered' | 'penalty.applied',
  payload: any
): Promise<WebhookEventLog> {
  const config = getWebhookConfig();

  // Create log entry
  const log: WebhookEventLog = {
    id: `wh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tenantId,
    timestamp: new Date().toISOString(),
    event,
    payload,
    status: 'Success',
    responseCode: 200
  };

  try {
    if (config.endpointUrl && config.endpointUrl.startsWith('http')) {
      // Attempt actual POST if URL is provided, else fallback to mock simulation
      const response = await fetch(config.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MGR-Signature': config.secretKey,
          'X-Chama-Tenant': tenantId
        },
        body: JSON.stringify({
          event,
          tenantId,
          timestamp: log.timestamp,
          data: payload
        })
      }).catch(() => null);

      if (response) {
        log.status = response.ok ? 'Success' : 'Failed';
        log.responseCode = response.status;
      }
    }
  } catch (err) {
    console.warn('MGR Webhook Dispatch Error:', err);
    log.status = 'Failed';
    log.responseCode = 500;
  }

  // Save log entry to storage
  const existingLogs = getWebhookLogs();
  const updatedLogs = [log, ...existingLogs].slice(0, 50); // Keep last 50
  saveWebhookLogs(updatedLogs);

  return log;
}
