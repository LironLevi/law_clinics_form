import formidable from "formidable";

export async function multiPartFormParser(req) {
  return new Promise(async (resolve, reject) => {

    const form = formidable({
      maxFiles: 5,
      maxFileSize: 1024 * 1024 * 30,
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
