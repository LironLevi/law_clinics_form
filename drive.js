import fs from "fs";
import { google } from "googleapis";
import { GOOGLE_CREDENTIALS, GOOGLE_DRIVE_DIRECTORY, GOOGLE_SCOPES } from "./config";

const auth = new google.auth.GoogleAuth({
  credentials: GOOGLE_CREDENTIALS,
  scopes: GOOGLE_SCOPES
});

const authClient = await auth.getClient();

export const driveClient = google.drive({
  version: "v3",
  auth: authClient
});

const sheetsClient = google.sheets({
  version: "v4",
  auth: authClient
});

export async function createFolder(folderName) {
  let result = null;
  const clientResponse = await driveClient.files.create({
    resource: {
      parents: [GOOGLE_DRIVE_DIRECTORY],
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
  })
  if (clientResponse.status === 200) {
    result = clientResponse.data.id;
  }
  return result;
}

export async function createSheetInFolder(folderId, name) {
  let result = null;
  const clientResponse = await driveClient.files.create({
    resource: {
      parents: [folderId],
      name,
      mimeType: "application/vnd.google-apps.spreadsheet",
    },
  })
  if (clientResponse.status === 200) {
    result = clientResponse.data.id;
  }
  return result;
}

export async function writeDataToSheet(spreadsheetId, data) {
  let result = null;
  const header = Object.keys(data);
  const record = Object.values(data);
  const resource = { values: [header, record] };
  const valueInputOption = "RAW";
  const range = "Sheet1"; // This is always the default

  const clientResponse = await sheetsClient.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption,
    resource,
  });
  if (clientResponse.status === 200) {
    result = clientResponse.data.id;
  }
  return result;
}

export async function uploadAssetsToFolder(folderId, files) {
  const results = [];
  for (const [key, value] of Object.entries(files)) {
    const { originalFilename, filepath, mimetype } = value;
    const clientResponse = await driveClient.files.create({
      resource: {
        parents: [folderId],
        name: originalFilename,
        mimeType: mimetype,
      },
      media: {
        body: fs.createReadStream(filepath),
        mimeType: mimetype,
      }
    })
    if (clientResponse.status === 200) {
      results.push(clientResponse.data.id);
    }
  }
  return results;
}

export async function adjustDims (spreadsheetId) {
  let result = null;
  const clientResponse = await sheetsClient.spreadsheets.batchUpdate({
    spreadsheetId: spreadsheetId,

    resource: {
      requests: [
        {
          autoResizeDimensions: {
            dimensions: {
              dimension: "COLUMNS",
            }
          }
        }
      ]  
    }
  });
  if (clientResponse.status === 200) {
    result = clientResponse.data.id;
  }
  return result;
}
