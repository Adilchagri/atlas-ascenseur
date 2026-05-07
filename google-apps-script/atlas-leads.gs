const OWNER_EMAIL = 'adilchagri7@gmail.com';
const SHEET_NAME = 'Atlas Ascenseurs 3D Leads';
const TAB_NAME = 'Leads';

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}');
    const sheet = getLeadSheet();
    const configuration = payload.configuration || {};

    sheet.appendRow([
      new Date(),
      payload.firstName || '',
      payload.lastName || '',
      payload.phone || '',
      payload.email || '',
      configuration.type || '',
      configuration.capacity || '',
      configuration.speed || '',
      configuration.door || '',
      configuration.control || '',
      configuration.wall || '',
      configuration.floor || '',
      configuration.lighting || '',
      configuration.bestFor || '',
      (configuration.features || []).join(', '),
    ]);

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: 'New Atlas Ascenseurs 3D configuration lead',
      htmlBody: buildEmail(payload, configuration),
    });

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'Atlas Ascenseurs leads endpoint' });
}

function getLeadSheet() {
  const files = DriveApp.getFilesByName(SHEET_NAME);
  const spreadsheet = files.hasNext()
    ? SpreadsheetApp.open(files.next())
    : SpreadsheetApp.create(SHEET_NAME);

  let sheet = spreadsheet.getSheetByName(TAB_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(TAB_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted At',
      'First Name',
      'Last Name',
      'Phone',
      'Email',
      'Model',
      'Capacity',
      'Speed',
      'Door',
      'Control Panel',
      'Wall Finish',
      'Floor',
      'Lighting',
      'Best For',
      'Features',
    ]);
  }

  return sheet;
}

function buildEmail(payload, configuration) {
  return `
    <h2>New Atlas Ascenseurs 3D Configuration</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.firstName)} ${escapeHtml(payload.lastName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <hr>
    <p><strong>Model:</strong> ${escapeHtml(configuration.type)}</p>
    <p><strong>Capacity:</strong> ${escapeHtml(configuration.capacity)}</p>
    <p><strong>Speed:</strong> ${escapeHtml(configuration.speed)}</p>
    <p><strong>Door:</strong> ${escapeHtml(configuration.door)}</p>
    <p><strong>Control Panel:</strong> ${escapeHtml(configuration.control)}</p>
    <p><strong>Wall:</strong> ${escapeHtml(configuration.wall)}</p>
    <p><strong>Floor:</strong> ${escapeHtml(configuration.floor)}</p>
    <p><strong>Lighting:</strong> ${escapeHtml(configuration.lighting)}</p>
  `;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
