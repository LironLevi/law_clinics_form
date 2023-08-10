
import { adjustDims, createFolder, createSheetInFolder, uploadAssetsToFolder, writeDataToSheet } from "../../drive";
import { multiPartFormParser } from "../../forms";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { fields, files } = await multiPartFormParser(req);
  const fullName = `${fields["שם פרטי"]} ${fields["שם משפחה"]}`;
  const folderName = fields["שם התיקייה"] !== "" ? fields["שם התיקייה"] : fullName;
  const fileName = fields["שם הטופס"] !== "" ? fields["שם הטופס"] : fullName;
  const filtered = Object.keys(fields).reduce(
    function (filtered, key) {
    if (!key.includes("קובץ")) filtered[key] = (fields[key] != "null" && fields[key] != "false") ? fields[key] : "";
    return filtered;
  }, {});
  const folderId = await createFolder(folderName);
  const sheetId = await createSheetInFolder(folderId, fileName);
  const wroteData = await writeDataToSheet(sheetId, filtered);
  const resized = await adjustDims(sheetId);
  const attachedAssetsUpload = await uploadAssetsToFolder(folderId, files);
  res.send(folderId);
}
