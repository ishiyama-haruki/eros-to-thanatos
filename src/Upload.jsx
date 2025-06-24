import {useRef} from "react";
import './App.css'


function Upload() {
    const inputRef = useRef(null);

    const fileUpload = () => {
        if (inputRef.current == null) return;
        inputRef.current.click();
    };

    const onFileInputChange = (e) => {
        if (e.target.files == null) return;
        console.log(e.target.files);
    }

    return (
        <div className="App">
            <div className="flex justify-center items-center h-screen">
                <div className="rounded shadow-lg w-full">
                    <div className="flex justify-center">
                        <div className="my-8 flex justify-center grid">
                            <h1 className="font-bold text-sm font col-span-3 text-center">画像アップロード</h1>
                            <div className="col-span-3 flex justify-center w-full">
                                <button className="bg-blue-400 rounded" onClick={fileUpload}>ファイルを選択</button>
                                <input
                                    type="file"
                                    accept=".png, .jpeg, .jpg"
                                    ref={inputRef}
                                    className="hidden"
                                    onChange={onFileInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload;