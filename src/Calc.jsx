// 必要なモジュールをインポート
import { useRef, useState } from "react";
import AWS from 'aws-sdk';

AWS.config.update({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: new AWS.Credentials({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  }),
});

const s3 = new AWS.S3();

const Calc = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const key = `${import.meta.env.VITE_AWS_S3_DIR}/${selectedFile.name}`;
    
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
      Key: key,
      Body: selectedFile,
      ContentType: selectedFile.type,
    //   ACL: 'public-read', // アップロードした画像を公開
    };

    setIsUploading(true);

    try {
      await s3.upload(params).promise();
      const url = `https://${params.Bucket}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${key}`;
      setUploadedUrl(url);
      console.log("アップロード成功");
    } catch (error) {
        console.error("アップロード失敗:", error);
        // 追加情報
        console.log("Error message:", error.message);
        console.log("Error code:", error.code);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">画像アップロード</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="プレビュー"
          className="w-full object-cover mb-2 rounded"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        style={{ backgroundColor: "blue" }}
      >
        {isUploading ? 'アップロード中...' : 'アップロード'}
      </button>

      {uploadedUrl && (
        <p className="mt-2 text-sm break-all text-green-700">
          アップロード完了: <a href={uploadedUrl} target="_blank" rel="noreferrer">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
};

export default Calc;
