export const GOOGLE_CREDENTIALS = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
  // private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};
export const GOOGLE_LOGIN = {
  drive_owner: process.env.GOOGLE_DRIVE_OWNER,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};
export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
];
export const GOOGLE_DRIVE_DIRECTORY = process.env.GOOGLE_DRIVE_DIRECTORY;
export const FORM_VALID_FIELDS = ["שם פרטי", "שם משפחה"];
export const CREATE_FOLDER_ENDPOINT = "/api/create-folder/";
export const OAUTH_CLIENT_CREDENTIALS = process.env.OAUTH_CLIENT_ID;