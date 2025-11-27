import multer from "multer";

const storage = multer.memoryStorage(); // store file in buffer

const upload = multer({ storage });

export default upload;
