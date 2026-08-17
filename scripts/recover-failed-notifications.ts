/**
 * Recover failed Resend notifications for persisted leads/applications.
 *
 * Usage:
 *   npx tsx scripts/recover-failed-notifications.ts list
 *   npx tsx scripts/recover-failed-notifications.ts list --academy
 *   npx tsx scripts/recover-failed-notifications.ts recover --lead <uuid>
 *   npx tsx scripts/recover-failed-notifications.ts recover --academy <uuid>
 *   npx tsx scripts/recover-failed-notifications.ts recover-all --leads
 *   npx tsx scripts/recover-failed-notifications.ts recover-all --academy
 *
 * Requires SUPABASE_* + Resend env. Does not create duplicate DB records.
 * Uses notification claim so concurrent recoveries cannot double-send.
 *
 * Dry-run / non-production safety: set OPS_RECOVERY_DRY_RUN=true to list only.
 */

import {
  listPendingAcademyNotifications,
  listPendingLeadNotifications,
  recoverAcademyNotification,
  recoverLeadNotification,
} from "../src/lib/ops/recover-notifications";

function maskEmail(email: string) {
  const at = email.indexOf("@");
  if (at <= 0) return "[redacted]";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!domain) return "[redacted]";
  const safeLocal =
    local.length <= 2 ? `${local.slice(0, 1)}*` : `${local.slice(0, 2)}***`;
  return `${safeLocal}@${domain}`;
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const dryRun = process.env.OPS_RECOVERY_DRY_RUN === "true";

  if (!command || command === "help" || command === "--help") {
    console.log(`recover-failed-notifications

Commands:
  list [--academy]
  recover --lead <uuid>
  recover --academy <uuid>
  recover-all --leads
  recover-all --academy

Set OPS_RECOVERY_DRY_RUN=true to prevent sends.
`);
    process.exit(0);
  }

  if (command === "list") {
    if (args.includes("--academy")) {
      const rows = await listPendingAcademyNotifications();
      console.log(`Pending academy notifications: ${rows.length}`);
      for (const row of rows) {
        console.log(
          `- ${row.id} | ${row.createdAt} | ${row.programSlug} | ${maskEmail(row.email)}`,
        );
      }
      return;
    }

    const rows = await listPendingLeadNotifications();
    console.log(`Pending lead notifications: ${rows.length}`);
    for (const row of rows) {
      console.log(
        `- ${row.id} | ${row.createdAt} | ${row.company} | ${maskEmail(row.workEmail)}`,
      );
    }
    return;
  }

  if (command === "recover") {
    const leadIdx = args.indexOf("--lead");
    const academyIdx = args.indexOf("--academy");
    if (leadIdx >= 0) {
      const id = args[leadIdx + 1];
      if (!id) throw new Error("Missing lead uuid");
      if (dryRun) {
        console.log(`[dry-run] would recover lead ${id}`);
        return;
      }
      const result = await recoverLeadNotification(id);
      console.log(`Lead ${id}: ${result}`);
      return;
    }
    if (academyIdx >= 0) {
      const id = args[academyIdx + 1];
      if (!id) throw new Error("Missing academy application uuid");
      if (dryRun) {
        console.log(`[dry-run] would recover academy ${id}`);
        return;
      }
      const result = await recoverAcademyNotification(id);
      console.log(`Academy ${id}: ${result}`);
      return;
    }
    throw new Error("Specify --lead <uuid> or --academy <uuid>");
  }

  if (command === "recover-all") {
    if (args.includes("--leads")) {
      const rows = await listPendingLeadNotifications();
      console.log(`Recovering ${rows.length} lead notification(s)…`);
      for (const row of rows) {
        if (dryRun) {
          console.log(`[dry-run] would recover lead ${row.id}`);
          continue;
        }
        const result = await recoverLeadNotification(row.id);
        console.log(`Lead ${row.id}: ${result}`);
      }
      return;
    }
    if (args.includes("--academy")) {
      const rows = await listPendingAcademyNotifications();
      console.log(`Recovering ${rows.length} academy notification(s)…`);
      for (const row of rows) {
        if (dryRun) {
          console.log(`[dry-run] would recover academy ${row.id}`);
          continue;
        }
        const result = await recoverAcademyNotification(row.id);
        console.log(`Academy ${row.id}: ${result}`);
      }
      return;
    }
    throw new Error("Specify --leads or --academy");
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Recovery failed");
  process.exit(1);
});
